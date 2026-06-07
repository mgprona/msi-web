const COUNTER_KEY = "page-views";
const allowedOrigins = new Set([
  "https://mgprona.com",
  "https://www.mgprona.com",
  "https://mgprona.github.io",
]);

function jsonHeaders(request) {
  const origin = request.headers.get("Origin");

  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://mgprona.com",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = jsonHeaders(request);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (url.pathname !== "/visit") {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers,
      });
    }

    const current = Number(await env.VISIT_COUNTER.get(COUNTER_KEY)) || 0;
    const count = request.method === "POST" ? current + 1 : current;

    if (request.method === "POST") {
      await env.VISIT_COUNTER.put(COUNTER_KEY, String(count));
    } else if (request.method !== "GET") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers,
      });
    }

    return new Response(JSON.stringify({ count }), { headers });
  },
};
