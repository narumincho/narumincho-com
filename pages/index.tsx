import * as React from "react";
import Head from "next/head";

const notionUrl = new URL(
  "https://narumincho.notion.site/22961d0ee2924074a22ce37f405b941a"
);
export const TopPage = (): React.ReactElement => {
  return (
    <>
      <Head>
        <title>ナルミンチョの創作記録は Notion に移動しました</title>
      </Head>
      <div>
        ナルミンチョの創作記録は
        <a href={notionUrl.toString()}>{notionUrl.toString()}</a>
        に移動しました.
      </div>
    </>
  );
};

export default TopPage;
