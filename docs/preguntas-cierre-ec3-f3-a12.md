# Preguntas de cierre - EC3 F3 A12

## 1. ¿Qué diferencia existe entre desarrollo, pruebas y producción?

Desarrollo usa el proxy de Vite, las pruebas ejecutan código en Vitest con
jsdom y respuestas controladas, y producción publica un bundle estático que
consume la API HTTPS configurada.

## 2. ¿Qué verifica la suite automatizada?

Comprueba el almacenamiento de sesión, el comportamiento de la guarda de
rutas y las respuestas y encabezados del cliente HTTP, incluyendo 401, 403 y
204.

## 3. ¿Por qué se usa `pnpm install --frozen-lockfile`?

Instala exactamente las dependencias registradas en `pnpm-lock.yaml` y falla
si el manifiesto y el lockfile no concuerdan, haciendo reproducible el build.

## 4. ¿Qué ejecuta `pnpm verify`?

Ejecuta lint, pruebas automatizadas y build de producción; un fallo en
cualquiera de estas etapas debe corregirse antes de desplegar.

## 5. ¿Qué valor debe tener `VITE_API_URL` en desarrollo y pruebas?

`/api`. En desarrollo, Vite lo envía a `http://localhost:3000`; Vitest usa el
mismo prefijo con solicitudes simuladas.

## 6. ¿Qué valor debe tener `VITE_API_URL` en producción?

Una URL HTTPS absoluta del backend que termine en `/api`, por ejemplo
`https://api.example.com/api`. El valor se incorpora al bundle durante el
build y no puede contener secretos.

## 7. ¿Por qué una variable `VITE_*` no es secreta?

Vite sustituye su valor al compilar y el navegador puede leerlo en los
archivos públicos. Las claves privadas y credenciales deben permanecer en el
backend.

## 8. ¿Por qué Render debe reescribir rutas a `index.html`?

React Router resuelve las rutas en el navegador. La reescritura permite que
una URL profunda como `/tasks/123` entregue la SPA al abrirla o recargarla.

## 9. ¿Qué origen debe permitir CORS?

El origen HTTPS exacto del frontend desplegado, compuesto por esquema y host,
sin ruta ni barra final. La configuración se realiza en el backend.

## 10. ¿Qué comprueba el smoke test?

Que las URLs del frontend y la API son HTTPS, que el inicio y una ruta
profunda sirven la SPA y que el endpoint `/health` de la API responde con
éxito.

## 11. ¿Qué significan 401, 403 y 204 en la aceptación?

401 indica que la sesión no es válida; 403, que la identidad autenticada no
tiene permiso; 204 confirma una operación exitosa sin cuerpo, como eliminar
una tarea.

## 12. ¿Cuándo se crea la etiqueta `v1.0.0`?

Solo después de que el commit esté desplegado, el smoke test pase y se complete
la aceptación manual con roles `user` y `admin`. La etiqueta debe señalar ese
commit desplegado, no un commit posterior ni uno todavía no aceptado.
