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
        "Netlify-CDN-Cache-Control": "public,durable,s-maxage=31536000",
      },
    });

    return response;
  } catch (error) {
    return new Response(`Error fetching data: ${error.message}`, {
      status: 500,
    });
  }
};
