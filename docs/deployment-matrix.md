# Matriz de despliegue

| Aspecto | Desarrollo | Pruebas | Producción |
| --- | --- | --- | --- |
| `VITE_API_URL` | `/api` (proxy Vite a `http://localhost:3000`) | `/api` (respuesta simulada por pruebas) | URL HTTPS real del backend terminada en `/api` |
| Carga de variables | `.env.local` o `.env.development.local` | `.env.test` | Variable `VITE_API_URL` en Render antes del build |
| Build | `pnpm dev` | `pnpm test` | `pnpm install --frozen-lockfile && pnpm verify` |
| Publicación | Servidor de Vite | Vitest + jsdom | Sitio estático `dist` en Render |
| Navegación SPA | React Router | MemoryRouter | Rewrite `/*` a `/index.html` |
| Origen API | Proxy local `/api` | Fetch simulado; no requiere API | HTTPS y CORS del backend configurado para el origen exacto del frontend |
| Datos sensibles | No incluir secretos en variables `VITE_*` | No usar credenciales reales | No incluir secretos en el bundle ni en evidencias |

Render compila el frontend; no sustituye ni despliega la API. La base de datos,
las cuentas y CORS siguen siendo responsabilidad de `task-api-express`.
