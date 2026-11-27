# Administrador de tareas Frontend

SPA desarrollada con React 19, TypeScript, Vite, React Router 7 y Fetch API.
Consume la API REST protegida de `task-api-express`.

## Funcionalidades

- Registro, inicio de sesión, restauración de identidad y cierre de sesión.
- Rutas públicas y protegidas.
- CRUD remoto de tareas, búsqueda, filtros, ordenamiento, paginación y detalle.
- Permisos de interfaz para roles `user` y `admin`.
- Estados de carga, vacío, error, 401, 403 y 204.

## Requisitos

- Node.js compatible con Vite 8 (Node.js 20.19+ o 22.12+).
- PNPM.
- API ejecutándose en `http://localhost:3000`.

## Desarrollo

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

En desarrollo, `.env.example` configura `VITE_API_URL=/api`; el proxy de Vite
envía las peticiones a `http://localhost:3000`. Si se utiliza `.env.local` con
el origen de la API (`http://localhost:3000`), el cliente añade `/api`.

## Pruebas y verificación

```powershell
pnpm test
pnpm verify
```

`pnpm verify` ejecuta lint, pruebas automatizadas y build de producción.
Vitest/Testing Library cubren almacenamiento de sesión, guardas de rutas y
cliente HTTP.

## Configuración de producción

Copiar `.env.production.example` a `.env.production` y establecer
`VITE_API_URL` como la URL HTTPS absoluta del backend, terminada en `/api`
(por ejemplo, `https://api.example.com/api`). La aplicación valida esta
configuración durante el build de producción. Las variables `VITE_*` se
incluyen en el bundle público: no guardar secretos en ellas.

Como `pnpm verify` incluye un build de producción, para ejecutarlo localmente
hay que definir una URL HTTPS válida en `.env.production` o en el entorno del
proceso. La URL de ejemplo sirve para comprobar la compilación, pero no para
desplegar ni ejecutar aceptación.

`render.yaml` configura el sitio estático, la reescritura SPA y encabezados
HTTP. En Render, definir `VITE_API_URL` con la URL real de la API y permitir
el origen HTTPS exacto del frontend en la configuración CORS del backend.
Consulte [la lista de liberación](./docs/release-checklist.md),
[la configuración de despliegue](./docs/deployment-configuration.md) y
[la matriz de despliegue](./docs/deployment-matrix.md).

Después de publicar, ejecutar el smoke test con ambas URLs:

```powershell
pnpm smoke:production -- https://frontend.example.com https://api.example.com/api
```

El smoke test comprueba el documento de inicio, una ruta profunda de la SPA y
el endpoint de salud de la API. La aceptación con cuentas `user` y `admin`
debe completarse manualmente antes de etiquetar el commit desplegado.

## Seguridad de sesión

El access token se conserva en `sessionStorage` para restaurar la sesión en la
pestaña. No se almacenan contraseñas ni se imprimen tokens. El backend sigue
siendo responsable de autenticar y autorizar cada solicitud; las guardas y los
controles de rol del frontend solo afectan la navegación y la interfaz.
