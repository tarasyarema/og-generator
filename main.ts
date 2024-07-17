const HTML_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <title>
      OG image previewer
    </title>
  </head>
  <body>
    <div>
      <p>To use append the image url as a query parameter</p>
      <pre>?image_url={url}</pre>
      <p>or</p>
      <pre>?image_base64={base64_string}</pre>
    </div>
    <div>
      <p>Image</p>
      {}
    </div>
  </body>
</html>`;

function handler(req: Request): Response {
  const url = new URL(req.url);
  const imageContent = url.searchParams.get("image_url");

  return new Response(
    `<!DOCTYPE html>
<html>
  <head>
    <title>
      OG image previewer
    </title>
    <meta property="og:title" content="OG image previewer" />
    <meta property="og:description" content="A simple tool to preview OG images" />
    <meta property="og:url" content="https://taras.lol" />
    ${
      imageContent
        ? `<meta property="og:image" content="${imageContent}" />`
        : ""
    }
  </head>
  <body>
    <div>
      <p>To use append the image url as a query parameter</p>
      <pre>?image_url={url}</pre>
    </div>
    <div>
      <p>Image</p>
      ${imageContent ? `<img src="${imageContent}"></img>` : ""}
    </div>
  </body>
</html>`,
    {
      headers: {
        "content-type": "text/html",
      },
    },
  );
}

Deno.serve(handler);
