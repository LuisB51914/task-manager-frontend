# Preguntas de cierre - EC3 F1 A9

## 1. ¿Qué es una aplicación de página única?

Una aplicación de página única (SPA, por sus siglas en inglés) es un sitio web o interfaz de usuario que carga una sola página HTML y actualiza el contenido dinámicamente mediante JavaScript, sin necesidad de recargar la página completa cada vez que el usuario navega entre vistas. En React, esto se consigue con enrutamiento del lado del cliente.

## 2. ¿Qué responsabilidad tiene BrowserRouter?

`BrowserRouter` es el componente que habilita el enrutamiento basado en la URL del navegador. Su responsabilidad es escuchar la ruta actual y proveer el contexto de navegación a los componentes hijos para que puedan decidir qué vista renderizar según la URL.

## 3. ¿Cuál es la diferencia entre Routes y Route?

`Routes` es el contenedor que agrupa varias rutas. Dentro de él se definen los `Route`, cada uno con una `path` y un `element` o un contenido asociado. La diferencia es que `Routes` organiza la selección de rutas, mientras que `Route` describe cada una de las posibles páginas o vistas.

## 4. ¿Qué es una ruta índice?

Una ruta índice es la ruta por defecto de un conjunto de rutas anidadas. En React Router, se usa con `index` para indicar la vista que se renderiza cuando la URL coincide con la ruta padre. Por ejemplo, `/` o la ruta raíz de un layout.

## 5. ¿Qué beneficio ofrece un layout?

Un layout permite reutilizar una estructura común en varias páginas, como el encabezado, la navegación, el contenido principal y el pie de página. Esto ayuda a mantener una interfaz consistente, reducir duplicación de código y organizar mejor la aplicación.

## 6. ¿Qué función cumple Outlet?

`Outlet` es un espacio de renderizado que se usa dentro de un layout. Indica dónde deben mostrarse las rutas hijas definidas dentro de ese layout. Es decir, el layout se mantiene visible y en su interior se sustituye el contenido según la ruta actual.

## 7. ¿Qué diferencia existe entre Link y NavLink?

`Link` sirve para crear enlaces de navegación normales entre rutas. `NavLink` además permite aplicar clases CSS o estilos cuando el enlace corresponde a la ruta activa. Por eso es útil para menús y navegación principal, porque puede reflejar visualmente la página actual.

## 8. ¿Por qué no se utilizan enlaces a para navegar internamente?

Porque `a href` provoca una recarga completa de la página y rompe la experiencia de SPA. En una aplicación de página única, la navegación interna debe manejarse con el router del cliente para actualizar la vista sin recargar el navegador y sin perder el estado de la aplicación.

## 9. ¿Qué representa :taskId?

`:taskId` es un segmento dinámico de la ruta. Representa un valor variable que se extraerá de la URL, por ejemplo `/tasks/abc123`, donde `abc123` puede ser el identificador de una tarea.

## 10. ¿Cómo se recupera un parámetro dinámico?

Se recupera con `useParams()`, que devuelve un objeto con los parámetros definidos en la ruta. Por ejemplo: `const { taskId } = useParams<{ taskId: string }>();` y luego se usa `taskId` para buscar la tarea correspondiente.

## 11. ¿Cuándo debe utilizarse useNavigate?

`useNavigate` se usa cuando se requiere cambiar de ruta programáticamente, por ejemplo después de crear, editar o eliminar una tarea. Es útil en eventos como clics, confirmaciones o lógica de flujo que debe redirigir al usuario sin depender de un link visible.

## 12. ¿Qué función cumple la ruta *?

La ruta `*` funciona como ruta comodín o fallback. Se usa para capturar cualquier URL que no coincida con las rutas definidas previamente. Es útil para mostrar una página 404 cuando el usuario visita una ruta inexistente.

## 13. ¿Por qué el estado continúa administrado por App?

Porque el estado principal de las tareas y sus operaciones se comparte entre varias vistas, como la lista, la búsqueda, el resumen y el detalle. Mantenerlo en `App` facilita que todas las partes de la aplicación consuman y actualicen la misma información sin duplicarla ni desincronizarla.

## 14. ¿Por qué localStorage permanece en esta actividad?

Porque localStorage permite persistir los datos de las tareas en el navegador, de manera que no se pierdan al recargar la página. En esta actividad, es una forma simple y efectiva de conservar la información entre sesiones del navegador sin necesidad de backend.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?

La dificultad principal fue un error de tipo en la página de detalle: `task` podía ser `undefined` al ejecutar la acción de eliminar, lo que provocaba un problema en TypeScript. Para resolverlo, validé primero si la tarea existía antes de usar `task.id` y añadí la comprobación adecuada dentro del manejador de eliminación. Además, confirmé con la compilación que la aplicación quedaba funcionando correctamente.
