// GymBuddy · función de IA para sugerir ejercicios alternativos.
// Despliegue: Supabase → Edge Functions → Create function "suggest" → pega este código
// y añade el secreto GROQ_API_KEY (gratis en https://console.groq.com/keys).
//
// Los usuarios nunca ven ni escriben claves: la app llama a esta función.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  try {
    const body = await req.json().catch(() => ({}));
    const exercise = String(body.exercise || "").trim().slice(0, 80);
    const day = String(body.day || "").trim().slice(0, 60);
    if (!exercise) return json({ items: [] }, 400);

    const key = Deno.env.get("GROQ_API_KEY");
    if (!key) return json({ items: [], error: "Falta configurar GROQ_API_KEY" }, 500);

    const prompt =
      `Eres entrenador personal de gimnasio. El usuario está entrenando "${day || "hoy"}" ` +
      `y la máquina de "${exercise}" está ocupada. Propón 3 ejercicios alternativos para el ` +
      `mismo grupo muscular, realistas en un gimnasio comercial (máquinas, poleas, mancuernas, barras). ` +
      `Deben ser distintos de "${exercise}" y entre sí. Responde SOLO con JSON válido: ` +
      `{"items":[{"nombre":"...","razon":"..."}]}. "razon" en español, máximo 12 palabras.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        max_tokens: 400,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "Devuelves únicamente JSON válido, sin markdown." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return json({ items: [], error: "Groq " + res.status + ": " + text.slice(0, 200) }, 502);
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = {};
    }

    const items = Array.isArray(parsed.items)
      ? parsed.items
          .slice(0, 3)
          .map((x: any) => ({
            nombre: String(x.nombre || x.name || "").slice(0, 80),
            razon: String(x.razon || x.reason || "").slice(0, 120),
          }))
          .filter((x: any) => x.nombre)
      : [];

    return json({ items });
  } catch (_e) {
    return json({ items: [], error: "Error inesperado" }, 500);
  }
});
