export default async (request: Request) => {
  const url = new URL(request.url);
  const outputUrl = url.searchParams.get("with");

  if (!outputUrl) {
    return new Response("Missing 'with' query parameter", { status: 400 });
  }

  try {
    const fetchData = await fetch(outputUrl);

    // Clone the response and set custom headers
    const body = await fetchData.arrayBuffer();
    const response = new Response(body, {
      status: fetchData.status,
      headers: {
        ...Object.fromEntries(fetchData.headers),
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3153,s-maxage=3153",
        "CDN-Cache-Control": "public, max-age=3153,s-maxage=3153",
        "Netlify-CDN-Cache-Control": "public, max-age=3153,s-maxage=3153",
      },
    });

    return response;
  } catch (error) {
    return new Response(`Error fetching data: ${error.message}`, {
      status: 500,
    });
  }
};
export const config = { path: "/api", cache: "manual" };
