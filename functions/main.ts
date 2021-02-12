import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
  COVER_IMAGE_URL,
  ICON_PATH,
  SCRIPT_URL,
  UrlData,
  urlDataToUrl,
  urlToUrlData,
} from "../common/main";
import { toString, view } from "@narumincho/html";

const app = admin.initializeApp();

export const main = functions.https.onRequest(async (request, response) => {
  console.log("request ip", request.ip);
  console.log("request path", request.path);
  console.log("request url", request.url);
  console.log("request subdomains", request.subdomains);

  const htmlAndIsNotFound = await urlDataToView({
    location: { tag: "home" },
    mode: "develop",
  });

  response.status(htmlAndIsNotFound.isNotFound ? 404 : 200);
  response.setHeader("content-type", "text/html");
  response.send(toString.toString(htmlAndIsNotFound.view));
});

const urlDataToView = (
  urlData: UrlData
): Promise<{ view: view.View<never>; isNotFound: boolean }> => {
  return Promise.resolve({
    view: {
      appName: "ナルミンチョの創作記録",
      pageName: "",
      themeColor: { r: 217 / 255, g: 120 / 255, b: 13 / 255 },
      bodyClass: "dummy",
      children: view.childrenText("読込中!!!"),
      url: urlDataToUrl(urlData),
      coverImageUrl: new URL(COVER_IMAGE_URL),
      description: "ナルミンチョが作ったものの記録",
      iconPath: ICON_PATH,
      language: "Japanese",
      scriptUrlList: [new URL(SCRIPT_URL)],
      styleUrlList: [],
      twitterCard: "SummaryCard",
    },
    isNotFound: false,
  });
};
