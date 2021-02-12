export type UrlData = {
  mode: Mode;
  location: Location;
};

export type Mode = "production" | "develop";

export type Location =
  | { tag: "home" }
  | { tag: "icon"; hash: string }
  | { tag: "script"; hash: string };

export const urlToUrlData = (url: URL): UrlData => {
  return {
    mode: url.origin.startsWith("http://localhost") ? "develop" : "production",
    location: pathToLocation(url.pathname),
  };
};

export const pathToLocation = (path: string): Location => {
  if (path === "/") {
    return { tag: "home" };
  }
  const iconMatchResult = path.match(/^\/icon-(?<hash>[0-9a-f]+)$/u);
  if (iconMatchResult !== null && iconMatchResult.groups !== undefined) {
    return { tag: "icon", hash: iconMatchResult.groups.hash };
  }
  const scriptMatchResult = path.match(/^\/script-(?<hash>[0-9a-f]+)$/u);
  if (scriptMatchResult !== null && scriptMatchResult.groups !== undefined) {
    return { tag: "script", hash: scriptMatchResult.groups.hash };
  }
  return { tag: "home" };
};

export const urlDataToUrl = (urlData: UrlData): URL => {
  return new URL(
    urlData.mode === "develop"
      ? "http://localhost:5000"
      : "https://narumincho.com" + locationToPath(urlData.location)
  );
};

const locationToPath = (location: Location): string => {
  switch (location.tag) {
    case "home":
      return "/";
    case "icon":
      return "/icon-" + location.hash;
    case "script":
      return "/script-" + location.hash;
  }
};

export const COVER_IMAGE_URL = "http:localhost:5000/icon.png";
export const ICON_PATH = "icon-replace-failure";
/*
 * icon のハッシュ値はどう含める? build時に functionsのコードに埋め込みたい
 * firebase の 環境変数に入れよう!
 */

export const SCRIPT_URL = "http:localhost:5000/main.js";
