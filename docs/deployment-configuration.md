# Configuración de despliegue

## Desarrollo

Usar `VITE_API_URL=/api` (valor de `.env.example`). Vite reenvía las peticiones
`/api` a `http://localhost:3000`.

## Pruebas

Vitest carga `.env.test`, que establece `VITE_API_URL=/api`. Las solicitudes se
simulan en las pruebas; no se requieren credenciales reales ni una API activa.

## Producción

En Render, definir `VITE_API_URL` antes del build como una URL HTTPS absoluta
del backend terminada en `/api`, sin credenciales. El build local validado
usó `https://task-api-express-luisbedolla-a12.onrender.com/api`.

Las variables con prefijo `VITE_` se incorporan al bundle y son públicas.
Nunca incluir `JWT_SECRET`, `MONGODB_URI`, contraseñas ni tokens. Configurar
`CORS_ORIGIN` en el backend con el origen exacto del frontend (esquema y host,
sin ruta ni barra final).

## Render Static Site

El `render.yaml` de este repositorio configura:

- build `pnpm install --frozen-lockfile && pnpm verify`;
- publicación de `dist`;
- reescritura `/*` a `/index.html` para React Router;
- encabezados de seguridad.

Conectar el servicio Render al repositorio `task-manager-frontend` y a la rama
que contiene este cambio. El servicio actualmente observado está conectado a
otro repositorio y no publica este frontend; no considerarlo como despliegue
de esta aplicación hasta confirmar el nuevo bundle.
