export default async (request: Request) => {
  const url = new URL(request.url);
  const outputUrl = url.searchParams.get("with");

  if (!outputUrl) {
    return new Response("Missing 'with' query parameter", { status: 400 });
  }

  try {
    // Fetch the audio file as a binary stream
    const fetchData = await fetch(outputUrl);

    // Validate response integrity
    if (!fetchData.ok) {
      return new Response(`Failed to fetch resource: ${fetchData.statusText}`, {
        status: fetchData.status,
      });
    }

    // Ensure response body is not prematurely consumed
    const body = await fetchData.arrayBuffer();

    // Create new headers, extend original headers, and set caching headers
    const headers = new Headers(fetchData.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000");
    headers.set(
      "Netlify-CDN-Cache-Control",
      "public, max-age=31536000, s-maxage=31536000"
    );

    // Return response with binary data
    return new Response(body, {
      status: fetchData.status,
      headers,
    });
  } catch (error) {
    return new Response(`Error fetching data: ${error.message}`, {
      status: 500,
    });
  }
};

export const config = { cache: "manual", path: "/api" };
