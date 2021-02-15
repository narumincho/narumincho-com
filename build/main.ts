import * as esbuild from "esbuild";
import * as fileSystem from "fs-extra";
import * as ts from "typescript";
import {
  Mode,
  debugHostingPortNumber,
  locationToPath,
  siteName,
  urlDataToUrl,
} from "../common/main";
import { toString, view } from "@narumincho/html";
import { createHash } from "crypto";

const clientSourceEntryPath = "./client/main.ts";
const functionsSourceEntryPath = "./functions/main.ts";
const distributionPath = "./distribution";
const functionsDistributionPath = `${distributionPath}/functions`;
const hostingDistributionPath = `${distributionPath}/hosting`;

export const build = async (mode: Mode): Promise<void> => {
  await fileSystem.outputFile(
    `${functionsDistributionPath}/package.json`,
    JSON.stringify({
      name: "narumincho-creative-record-functions",
      version: "1.0.0",
      description: "narumincho-creative-record in Cloud Functions for Firebase",
      main: "functions/main.js",
      author: "narumincho",
      engines: { node: "14" },
      dependencies: {
        "@narumincho/html": "0.2.3",
        "firebase-admin": "9.4.2",
        "firebase-functions": "3.13.1",
      },
    })
  );

  await fileSystem.ensureDir(hostingDistributionPath);

  const iconBuffer = await fileSystem.readFile("./build/icon.png");
  const iconHash = createSha256Hash(iconBuffer);
  fileSystem.writeFile(
    `${hostingDistributionPath}${locationToPath({
      tag: "icon",
      hash: iconHash,
    })}`,
    iconBuffer
  );

  await esbuild.build({
    entryPoints: [clientSourceEntryPath],
    bundle: true,
    outdir: hostingDistributionPath,
  });
  const scriptBinary = await fileSystem.readFile(
    `${hostingDistributionPath}/main.js`
  );
  const scriptHash = createSha256Hash(scriptBinary);

  await fileSystem.rename(
    `${hostingDistributionPath}/main.js`,
    `${hostingDistributionPath}${locationToPath({
      tag: "script",
      hash: scriptHash,
    })}`
  );

  await generateHtml(mode, iconHash, scriptHash);
  await generateFirebaseJson(mode, iconHash, scriptHash);

  ts.createProgram({
    rootNames: [functionsSourceEntryPath],
    options: {
      target: ts.ScriptTarget.ES2020,
      forceConsistentCasingInFileNames: true,
      newLine: ts.NewLineKind.LineFeed,
      lib: ["DOM", "ES2020"],
      strict: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      module: ts.ModuleKind.CommonJS,
      outDir: functionsDistributionPath,
    },
  }).emit();
};

/**
 * Firebase の デプロイされたファイルの場所を指定したり,
 * Firebase Hosting から Cloud Functions for Firebase を呼ぶ設定を記述するファイル を生成する
 */
const generateFirebaseJson = (
  mode: Mode,
  iconHash: string,
  scriptHash: string
): Promise<void> => {
  return fileSystem.outputFile(
    `firebase.json`,
    JSON.stringify({
      functions: {
        source: functionsDistributionPath,
      },
      hosting: {
        public: hostingDistributionPath,
        rewrites: [
          {
            source: "**",
            function: "main",
          },
        ],
        headers: [
          {
            source: locationToPath({ tag: "icon", hash: iconHash }),
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=2592000",
              },
              {
                key: "Content-Type",
                value: "image/png",
              },
            ],
          },
          {
            source: locationToPath({ tag: "script", hash: scriptHash }),
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=2592000",
              },
              {
                key: "Content-Type",
                value: "text/javascript",
              },
            ],
          },
        ],
        cleanUrls: true,
      },
      emulators:
        mode === "production"
          ? undefined
          : {
              functions: {
                port: 5001,
              },
              firestore: {
                port: 8080,
              },
              hosting: {
                port: debugHostingPortNumber,
              },
              ui: {
                enabled: true,
              },
            },
    })
  );
};

const generateHtml = (
  mode: Mode,
  iconHash: string,
  scriptHash: string
): Promise<void> => {
  const homePageView: view.View<never> = {
    appName: siteName,
    pageName: "",
    themeColor: { r: 217 / 255, g: 120 / 255, b: 13 / 255 },
    bodyClass: "dummy",
    children: view.childrenText("サンプルページ!!"),
    url: urlDataToUrl({ mode, location: { tag: "home" } }),
    coverImageUrl: urlDataToUrl({
      mode,
      location: { tag: "icon", hash: iconHash },
    }),
    description: "ナルミンチョが作ったものの記録",
    iconPath: locationToPath({ tag: "icon", hash: iconHash }),
    language: "Japanese",
    scriptUrlList: [
      urlDataToUrl({
        mode,
        location: { tag: "script", hash: scriptHash },
      }),
    ],
    styleUrlList: [],
    twitterCard: "SummaryCard",
  };
  const homePageHtml: string = toString.toString(homePageView);
  return fileSystem.writeFile(
    `${hostingDistributionPath}/index.html`,
    homePageHtml
  );
};

const createSha256Hash = (binary: Uint8Array): string => {
  return createHash("sha256").update(binary).digest("hex");
};
