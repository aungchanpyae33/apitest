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
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=31536000",
        "CDN-Cache-Control": "public, max-age=31536000",
        "Netlify-CDN-Cache-Control": "public, max-age=31536000",
      },
    });

    return response;
  } catch (error) {
    return new Response(`Error fetching data: ${error.message}`, {
      status: 500,
    });
  }
};
export const config = { path: "/api" };

// import { CacheHeaders } from "cdn-cache-control";
// import type { Config } from "@netlify/functions";

// export default async function handler(request: Request): Promise<Response> {
//   const headers = new CacheHeaders();

//   return new Response("Hello, world!", { headers });
// }

// export const config: Config {
//   path: "/hello"
// }
