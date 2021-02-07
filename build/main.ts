import * as esbuild from "esbuild";
import * as fileSystem from "fs-extra";

const clientSourceEntryPath = "./client/main.ts";
const distributionPath = "./distribution";
const functionsDistributionPath = `${distributionPath}/functions`;
const hostingDistributionPath = `${distributionPath}/hosting`;

fileSystem.outputFile(
  `${functionsDistributionPath}/package.json`,
  JSON.stringify({
    name: "narumincho-creative-record-functions",
    version: "1.0.0",
    description: "narumincho-creative-record in Cloud Functions for Firebase",
    main: "main.js",
    author: "narumincho",
    engine: { node: "14" },
    dependencies: {
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
