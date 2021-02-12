import * as esbuild from "esbuild";
import * as fileSystem from "fs-extra";
import * as ts from "typescript";

const clientSourceEntryPath = "./client/main.ts";
const functionsSourceEntryPath = "./functions/main.ts";
const distributionPath = "./distribution";
const functionsDistributionPath = `${distributionPath}/functions`;
const hostingDistributionPath = `${distributionPath}/hosting`;

fileSystem.outputFile(
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
    },
    emulators: {
      functions: {
        port: 5001,
      },
      firestore: {
        port: 8080,
      },
      hosting: {
        port: 5000,
      },
      ui: {
        enabled: true,
      },
    },
  })
);

fileSystem.outputFile(
  `${functionsDistributionPath}/package.json`,
  JSON.stringify({
    name: "narumincho-creative-record-functions",
    version: "1.0.0",
    description: "narumincho-creative-record in Cloud Functions for Firebase",
    main: "functions/main.js",
    author: "narumincho",
    engine: { node: "14" },
    dependencies: {
      "@narumincho/html": "0.2.2",
      "firebase-admin": "9.4.2",
      "firebase-functions": "3.13.1",
    },
  })
);

fileSystem.ensureDir(hostingDistributionPath);

esbuild.build({
  entryPoints: [clientSourceEntryPath],
  bundle: true,
  outdir: hostingDistributionPath,
});

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
