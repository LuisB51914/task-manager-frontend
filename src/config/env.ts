const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
if (!rawApiUrl) {
  throw new Error("Falta la variable VITE_API_URL.");
}
const normalizedApiUrl = rawApiUrl.replace(/\/+$/, "");

if (import.meta.env.PROD) {
  let productionUrl: URL;
  try {
    productionUrl = new URL(normalizedApiUrl);
  } catch {
    throw new Error(
      "En producción, VITE_API_URL debe ser una URL HTTPS absoluta que termine en /api.",
    );
  }
  const apiPath = productionUrl.pathname.replace(/\/+$/, "");
  if (
    productionUrl.protocol !== "https:" ||
    !apiPath.endsWith("/api") ||
    productionUrl.username ||
    productionUrl.password ||
    productionUrl.search ||
    productionUrl.hash
  ) {
    throw new Error(
      "En producción, VITE_API_URL debe ser una URL HTTPS absoluta que termine en /api.",
    );
  }
}

export const API_URL = normalizedApiUrl.endsWith("/api")
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;
