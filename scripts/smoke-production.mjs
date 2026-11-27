const [frontendUrl, apiUrl] = process.argv.slice(2);

if (!frontendUrl || !apiUrl) {
  throw new Error(
    "Uso: pnpm smoke:production -- <frontend-https-url> <api-https-url-terminada-en-/api>",
  );
}

const frontend = new URL(frontendUrl);
const api = new URL(apiUrl);
if (frontend.protocol !== "https:" || api.protocol !== "https:") {
  throw new Error("Las URLs de producción deben utilizar HTTPS.");
}
if (!api.pathname.replace(/\/+$/, "").endsWith("/api")) {
  throw new Error("La URL de la API debe terminar en /api.");
}

async function checkFrontendPage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} respondió HTTP ${response.status}.`);
  }
  const html = await response.text();
  if (!html.includes('id="root"') || !html.includes('type="module"')) {
    throw new Error(`${url} no devolvió el documento de la SPA esperado.`);
  }
  console.log(`OK Frontend ${url} (${response.status})`);
}

await checkFrontendPage(frontend.href);
await checkFrontendPage(new URL("/tasks/smoke-check", frontend).href);

const healthUrl = new URL("/health", api.origin);
const healthResponse = await fetch(healthUrl);
if (!healthResponse.ok) {
  throw new Error(
    `${healthUrl} respondió HTTP ${healthResponse.status}.`,
  );
}
console.log(`OK API ${healthUrl} (${healthResponse.status})`);
