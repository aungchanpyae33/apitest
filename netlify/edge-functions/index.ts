export default async (request: Request) => {
  const url = new URL(request.url);
  const outputUrl = url.searchParams.get("with");

  if (!outputUrl) {
    return new Response("Missing 'with' query parameter", { status: 400 });
  }

  try {
    // Fetch the data from the output URL
    const fetchData = await fetch(outputUrl);

    // Create a new Headers object and extend it with custom headers
    const headers = new Headers(fetchData.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Cache-Control", "public, max-age=3153, s-maxage=3153");
    headers.set("CDN-Cache-Control", "public, max-age=3153, s-maxage=3153");
    headers.set(
      "Netlify-CDN-Cache-Control",
      "public, max-age=3153, s-maxage=3153"
    );

    // Return the response with the updated headers and the original body
    return new Response(fetchData.body, {
      status: fetchData.status,
      headers,
    });
  } catch (error) {
    return new Response(`Error fetching data: ${error.message}`, {
      status: 500,
    });
  }
};

export const config = { path: "/api", cache: "manual" };
