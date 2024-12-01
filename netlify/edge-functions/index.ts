export default async (request: Request) => {
  const url = new URL(request.url);
  const outputUrl = url.searchParams.get("with");

  if (!outputUrl) {
    return new Response("Missing 'with' query parameter", { status: 400 });
  }

  try {
    const fetchData = await fetch(outputUrl);

    // Clone the original response to avoid consuming the stream
    const clonedResponse = fetchData.clone();

    // Create headers
    const headers = new Headers(clonedResponse.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Cache-Control", "public, max-age=3153, s-maxage=3153");
    headers.set("CDN-Cache-Control", "public, max-age=3153, s-maxage=3153");
    headers.set(
      "Netlify-CDN-Cache-Control",
      "public, max-age=3153, s-maxage=3153"
    );

    // Get the full response body
    const body = await clonedResponse.arrayBuffer();

    // Create new response with the full body
    return new Response(body, {
      status: clonedResponse.status,
      headers,
    });
  } catch (error) {
    return new Response(`Error fetching data: ${error.message}`, {
      status: 500,
    });
  }
};

export const config = { path: "/api", cache: "manual" };
