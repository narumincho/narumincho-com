import * as fileSystem from "fs-extra";

const distributionPath = "./distribution";
const functionsPath = `${distributionPath}/functions`;
const hostingPath = `${distributionPath}/hosting`;

fileSystem.outputFile(
  `${functionsPath}/package.json`,
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

fileSystem.ensureDir(hostingPath);
