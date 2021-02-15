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
    (urlData.mode === "develop"
      ? `http://localhost:${debugHostingPortNumber}`
      : "https://narumincho-creative-record.web.app") +
      locationToPath(urlData.location)
  );
};

export const locationToPath = (location: Location): string => {
  switch (location.tag) {
    case "home":
      return "/";
    case "icon":
      return "/icon-" + location.hash;
    case "script":
      return "/script-" + location.hash;
  }
};

export const debugHostingPortNumber = 5000;
