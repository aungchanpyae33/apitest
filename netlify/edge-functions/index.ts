export default async (request: Request) => {
  const url = new URL(request.url);
  const outputUrl = url.searchParams.get("with");

  if (!outputUrl) {
    return new Response("Missing 'with' query parameter", { status: 400 });
  }

  try {
    const fetchData = await fetch(outputUrl);

    // Clone the response and set custom headers
    const response = new Response(fetchData.body, {
      status: fetchData.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=31536000",
        "CDN-Cache-Control": "public, max-age=31536000",
        "Netlify-CDN-Cache-Control": "public, max-age=31536000",
        "Cache-Tag": "edge-cache",
        "X-Cache-Status": "MISS", //
      },
    });

    return response;
  } catch (error) {
    return new Response(`Error fetching data: ${error.message}`, {
      status: 500,
    });
  }
};
