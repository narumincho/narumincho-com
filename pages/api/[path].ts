import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const path = request.query.path;
    if (typeof path !== "string") {
      response.status(400).json({ error: "need path" });
      return;
    }

    console.log(path);
    const r2Response = await fetch(
      "https://pub-5887a2dc47a745a49c111fa8f58b8d75.r2.dev/" + path
    );
    if (r2Response.ok) {
      response.status(200).send(await r2Response.arrayBuffer());
      return;
    }
    response.status(400).json({ error: "not found" });
  } catch (err) {
    response.status(500).json({ error: "failed to load data" });
  }
}
