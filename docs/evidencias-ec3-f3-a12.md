# Evidencias EC3 F3 A12

Completar con resultados reales del despliegue. No registrar contraseñas,
tokens, datos personales ni secretos.

## Verificación local

| Evidencia | Resultado |
| --- | --- |
| `pnpm install --frozen-lockfile` | Correcto |
| `pnpm lint` | Correcto; reporta 3 advertencias preexistentes sobre `set-state-in-effect` |
| `pnpm test` | Correcto; 3 archivos y 9 pruebas aprobadas |
| `pnpm build` con la URL HTTPS real de la API | Correcto; bundle apunta a la API suministrada y no contiene `/api/api` |
| `pnpm verify` con `VITE_API_URL=https://api.example.com/api` | Correcto; URL de ejemplo usada solo para validar localmente |

## Producción

| Dato | Resultado |
| --- | --- |
| URL HTTPS del frontend | `https://task-client-react-luisbedolla-a12.onrender.com` |
| URL HTTPS de la API (`/api`) | `https://task-api-express-luisbedolla-a12.onrender.com/api` |
| Smoke test del frontend y `/health` | Correcto; inicio, ruta profunda y API respondieron HTTP 200 |
| Salud de base de datos | Correcta; `/health/database` respondió `up` |
| CORS y respuesta sin token | Correctos; desde el frontend, `/api/auth/me` devolvió el 401 esperado |
| Origen configurado en Render | `LuisB51914/Frameworks-Backend-Luis-Bedolla`, rama `ec3-a12-despliegue-liberacion`, carpeta `client/` |
| Correspondencia del bundle desplegado | No coincide con este workspace: el servicio muestra “Task API Client” y su bundle no contiene la pantalla “Administrador de tareas protegido” |
| Decisión de integración | Mantener los repositorios separados; no reemplazar `client/` ni publicar cambios en el repositorio remoto |
| Build exitoso en Render del commit actual | Pendiente de confirmar |
| Aceptación manual con roles `user` y `admin` | Pendiente |
| Commit desplegado y etiqueta `v1.0.0` | Pendientes; no etiquetar hasta desplegar y aceptar este frontend |

La URL de ejemplo no representa un backend desplegado y no sirve para la
aceptación en producción. Las evidencias de producción requieren que Render
publique este frontend y completar las pruebas manuales con las cuentas de
prueba autorizadas.
