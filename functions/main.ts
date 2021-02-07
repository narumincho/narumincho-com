import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const app = admin.initializeApp();
const firestore = app.firestore();
const valueDocRef = firestore.collection("col").doc("ke");

export const main = functions.https.onRequest(async (request, response) => {
  const documentData = (await valueDocRef.get()).data();
  const oldValue: number = documentData === undefined ? 0 : documentData.value;
  const newValue = oldValue + 1;
  valueDocRef.set({
    value: newValue,
  });
  response.setHeader("content-type", "text/html");
  response.send(`<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>タイトル</title>
    <script defer src="/main.js"></script>
  </head>
  <body>
      カウント: ${newValue}
  </body>
</html>
`);
});
