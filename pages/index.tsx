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
          backgroundColor: "black",
          color: "white",
          placeContent: "center",
        }}
      >
        <div>
          ナルミンチョの創作記録は
          <a href="https://narumincho.notion.site/22961d0ee2924074a22ce37f405b941a">
            Notion
          </a>
          に移動しましたが. このサイトでもなにかするかも
        </div>
      </div>
    </>
  );
};

export default TopPage;
