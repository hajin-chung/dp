import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { secret } = body as { secret: string };

  if (!secret === import.meta.env.SECRET) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
    });
  }

  const headers = new Headers();
  headers.append("Set-Cookie", `session=${secret}; Path=/`);
  return new Response(JSON.stringify({ success: true }), {
    headers,
  });
};
