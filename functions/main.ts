import * as admin from "firebase-admin";
import * as common from "../common/main";
import * as functions from "firebase-functions";

const app = admin.initializeApp();
const firestore = app.firestore();
const countRef = firestore.collection("count").doc("main");

export const main = functions.https.onRequest(async (request, response) => {
  console.log("request ip", request.ip);
  console.log("request path", request.path);
  console.log("request url", request.url);
  console.log("request subdomains", request.subdomains);

  const count: number = (await countRef.get()).data()?.count ?? 0;
  await countRef.set({ count: count + 1 });
  response.setHeader("content-type", "text/plain");
  response.send(`${common.siteName}
閲覧数, いいね は 未実装.
${count + 1}`);
});
