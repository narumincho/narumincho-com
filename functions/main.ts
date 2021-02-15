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

  const count: number = await getCount();
  await countRef.set({ count: count + 1 });
  response.setHeader("content-type", "text/plain");
  response.send(`${common.siteName}
閲覧数, いいね は 未実装.
${count + 1}`);
});

const getCount = async (): Promise<number> => {
  const document = (await countRef.get()).data();
  if (document === undefined) {
    return 0;
  }
  const count: unknown = document.count;
  if (typeof count === "number") {
    return count;
  }
  return 0;
};
