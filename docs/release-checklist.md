# Lista de liberación Frontend 1.0.0

## Antes del despliegue

- [ ] Confirmar que la API de `task-api-express` está desplegada y que `/health`
      responde correctamente.
- [ ] Configurar `VITE_API_URL` en Render con la URL HTTPS real de la API,
      terminada en `/api`; nunca incluir credenciales.
- [ ] Configurar CORS en el backend para permitir el origen HTTPS exacto del
      frontend (esquema y host, sin ruta ni barra final).
- [x] Ejecutar `pnpm install --frozen-lockfile` y `pnpm verify`.
- [x] Confirmar con un build que `VITE_API_URL` contiene la URL HTTPS real
      suministrada y no genera una ruta `/api/api`.

## Render

- [ ] Crear o actualizar el Static Site mediante `render.yaml`.
- [ ] Confirmar build con `pnpm install --frozen-lockfile && pnpm verify`.
- [ ] Confirmar publicación de `dist` y la reescritura `/*` a `/index.html`.
- [ ] Confirmar los encabezados de seguridad definidos en `render.yaml`.
- [ ] Publicar y registrar la URL HTTPS exacta del frontend y el commit asociado.

## Smoke test

- [ ] Ejecutar `pnpm smoke:production -- <frontend-https-url> <api-https-url/api>`.
- [ ] Confirmar la carga de `/` y de una ruta profunda protegida.
- [ ] Confirmar respuesta satisfactoria de `/health` en el backend.

## Aceptación manual en producción

Usar cuentas de prueba autorizadas; no incluir contraseñas, tokens ni datos
personales en las evidencias.

- [ ] Abrir directamente `/`, `/login`, `/register`, `/tasks` y
      `/tasks/:taskId`; verificar las rutas profundas tras recargar.
- [ ] Registrar una cuenta `user`, iniciar sesión y comprobar la restauración
      de sesión después de recargar la pestaña.
- [ ] Cerrar sesión y comprobar que las rutas protegidas redirigen a login.
- [ ] Como `user`, crear, consultar, filtrar, paginar, editar y completar una
      tarea; comprobar que no se ofrece la eliminación.
- [ ] Como `admin`, repetir las operaciones y comprobar que la eliminación
      está disponible y confirmada.
- [ ] Comprobar respuestas 401 (sesión inválida), 403 (permiso denegado) y
      204 (eliminación correcta), así como mensajes de error y estados vacíos.
- [ ] Confirmar que la API responde y que la base de datos está disponible.
- [ ] Revisar la consola del navegador y la pestaña de red: sin errores,
      solicitudes duplicadas a `/api/api`, ni credenciales expuestas.

## Liberación

- [ ] Completar [la matriz de despliegue](./deployment-matrix.md),
      [la configuración](./deployment-configuration.md) y
      [las evidencias](./evidencias-ec3-f3-a12.md).
- [ ] Actualizar el changelog solo cuando la aceptación esté completa.
- [ ] Crear la etiqueta `v1.0.0` en el commit que efectivamente se desplegó y
      aceptó. No etiquetar un commit previo a la aceptación.
