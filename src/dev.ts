// Local dev server for narumincho.com
const PORT = 8000;

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
};

async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  let pathname = url.pathname;

  if (pathname === "/" || pathname === "") {
    pathname = "/index.html";
  }

  const filePath = `./dist${pathname}`;
  try {
    const file = await Deno.open(filePath, { read: true });
    const ext = pathname.substring(pathname.lastIndexOf("."));
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return new Response(file.readable, {
      headers: {
        "content-type": contentType,
        "cache-control": "no-cache",
      },
    });
  } catch (_e) {
    return new Response("Not Found", { status: 404 });
  }
}

console.log(`🌐 Dev server running at http://localhost:${PORT}`);
Deno.serve({ port: PORT }, handleRequest);
