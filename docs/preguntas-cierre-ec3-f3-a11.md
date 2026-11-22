# Preguntas de cierre - EC3 F3 A11

## 1. ¿Qué diferencia existe entre autenticación y autorización?

La autenticación verifica quién es el usuario, por ejemplo, mediante sus credenciales y un token válido. La autorización determina qué acciones y recursos puede utilizar ese usuario según su rol y sus permisos. Primero se autentica la identidad y después se evalúan sus permisos.

## 2. ¿Qué información guarda sessionStorage y qué información no debe guardar?

En esta aplicación, `sessionStorage` guarda el `accessToken` para restaurar la sesión al recargar la página en la misma pestaña. No debe guardar contraseñas ni datos secretos que no sean necesarios. El token también es sensible: cualquier JavaScript que se ejecute en el origen puede leerlo, por lo que hay que prevenir vulnerabilidades XSS y no tratar los datos guardados en el navegador como confiables.

## 3. ¿Por qué se consulta /api/auth/me al recargar?

Al recargar, el estado de React se pierde, aunque el `accessToken` permanezca en `sessionStorage`. La aplicación envía ese token a `GET /api/auth/me` como `Authorization: Bearer <token>` para que el backend verifique la sesión y devuelva la identidad vigente antes de mostrar las rutas protegidas.

## 4. ¿Por qué el Frontend no debe confiar en decodificar un JWT sin verificarlo?

Decodificar un JWT solo permite leer su contenido; no demuestra que su firma sea auténtica ni que el token no haya expirado o sido revocado. Un usuario puede modificar los datos decodificados en su cliente. El backend debe validar el token y tomar las decisiones de autorización.

## 5. ¿Qué responsabilidad tiene AuthProvider?

`AuthProvider` mantiene el estado compartido de autenticación: usuario, token y estado de la sesión. También ofrece operaciones como iniciar sesión, registrarse, cerrar sesión y revalidar el token al iniciar la aplicación. Así las rutas y componentes pueden reaccionar a una única fuente de estado en el cliente.

## 6. ¿Qué beneficio ofrece useAuth?

`useAuth` permite a los componentes acceder fácilmente al contexto de autenticación —por ejemplo, al usuario, al token y a las operaciones de sesión— sin pasar esas propiedades manualmente por toda la jerarquía. Además, informa si se usa fuera de `AuthProvider`.

## 7. ¿Qué representa el estado checking?

`checking` indica que la aplicación está comprobando si el token guardado sigue siendo válido. Mientras tanto, `ProtectedRoute` muestra un estado de validación y evita tanto mostrar contenido protegido prematuramente como redirigir al usuario antes de recibir la respuesta del backend.

## 8. ¿Qué diferencia existe entre 401 y 403?

`401 Unauthorized` indica que la solicitud no tiene una autenticación válida, por ejemplo, porque falta el token o expiró. `403 Forbidden` indica que la identidad fue reconocida, pero no tiene permiso para realizar esa acción.

## 9. ¿Por qué ProtectedRoute no sustituye la seguridad del Backend?

`ProtectedRoute` controla la navegación y la experiencia visual en el navegador, pero el usuario puede modificar el cliente o llamar a la API directamente. El backend debe autenticar y autorizar cada solicitud protegida, independientemente de lo que muestre la interfaz.

## 10. ¿Por qué ocultar Eliminar a user no constituye autorización?

Ocultar el botón evita ofrecer esa acción en la interfaz, pero no impide que alguien construya manualmente una solicitud de eliminación. El backend debe comprobar el rol del solicitante en cada operación y rechazar la acción si no está permitida.

## 11. ¿Por qué un cambio de rol exige iniciar sesión de nuevo?

Si el rol o los permisos están incluidos en el token, ese token puede conservar los valores antiguos hasta que expire. Iniciar sesión de nuevo —o renovar y revalidar la sesión— permite obtener credenciales y datos actualizados. La estrategia exacta depende del backend; este debe aplicar siempre el rol vigente al autorizar cada solicitud.

## 12. ¿Qué ocurre realmente al seleccionar Cerrar sesión?

En esta aplicación se elimina el token de `sessionStorage` y se limpian el usuario y el estado autenticado de React. El cierre es local: no se llama a un endpoint para revocar el token en el servidor. Si el backend no lo revoca por otro mecanismo, podría seguir siendo válido hasta su expiración.

## 13. ¿Qué riesgo conserva sessionStorage ante XSS?

Un script malicioso que se ejecute en el origen de la aplicación puede leer el `accessToken` de `sessionStorage` y usarlo para suplantar al usuario mientras sea válido. Por eso se debe prevenir XSS y reducir la exposición del token. `sessionStorage` limita la persistencia a la pestaña, pero no protege contra scripts ejecutados en ella.

## 14. ¿Por qué las tareas todavía no pertenecen a un usuario específico?

El tipo `Task` del cliente solo define `id`, `title`, `status`, `createdAt` y `updatedAt`; no incluye una relación de propietario. Enviar el token identifica al usuario que hace la solicitud, pero no asigna automáticamente una tarea a esa persona. Para aislar las tareas, el backend debe guardar su propietario y filtrar las consultas y operaciones por la identidad autenticada.
