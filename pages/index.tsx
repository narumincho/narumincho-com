import * as React from "react";
import Head from "next/head";
import iconPng from "../public/icon.png";

export const TopPage = (): React.ReactElement => {
  return (
    <>
      <Head>
        <title>ナルミンチョの創作記録は Notion に移動しました</title>
        <link rel="icon" type="image/png" href={iconPng.src} />
      </Head>
      <div
        css={{
          display: "grid",
          placeContent: "center",
          height: "100%",
          color: "white",
          backgroundColor: "black",
        }}
        lang="ja"
      >
        <div
          css={{
            borderStyle: "solid",
            borderColor: "gray",
            borderRadius: 8,
            padding: 8,
          }}
        >
          ナルミンチョの創作記録は
          <a
            href="https://narumincho.notion.site/22961d0ee2924074a22ce37f405b941a"
            css={{
              color: "cyan",
            }}
          >
            Notion
          </a>
          に移動しましたが. このサイトでもなにかするかも...?
        </div>
      </div>
    </>
  );
};

export default TopPage;
