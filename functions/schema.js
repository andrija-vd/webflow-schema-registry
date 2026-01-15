export async function GET({ request }) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path");

  const map = {
    "/agencies/veza-digital": "veza-digital.json",
    "/agencies/belt-creative": "belt-creative.json",
    "/agencies/shadow-digital": "shadow-digital.json",
    "/agencies/hedrick": "hedrick.json"
  };

  const file = map[path];
  if (!file) {
    return new Response(null, { status: 204 });
  }

  const res = await fetch(
    "https://raw.githubusercontent.com/andrija-vd/webflow-schema-registry/main/schema/" + file
  );

  const schema = await res.text();

  return new Response(schema, {
    headers: {
      "Content-Type": "application/ld+json",
      "Cache-Control": "public, max-age=86400"
    }
  });
}
