# Preguntas de cierre — EC2-F3-A8

1. **¿Por qué las reglas de validación se colocaron en una utilidad?**  
   Para separar la validación de la interfaz y poder reutilizar las mismas reglas al crear y editar tareas. `TaskForm` y `TaskItem` llaman a `validateTaskTitle`, evitando duplicar la lógica y manteniendo los mensajes y límites consistentes.

2. **¿Qué significa el retorno `string | null` de `validateTaskTitle`?**  
   La función devuelve un `string` con el mensaje que explica el error cuando el título no es válido; si pasa todas las reglas, devuelve `null`. Así, quien la utiliza puede decidir si muestra el mensaje o continúa con la operación.

3. **¿Qué función cumplen `aria-invalid`, `aria-describedby` y `role="alert"`?**  
   `aria-invalid` informa a las tecnologías de asistencia que el campo contiene un valor inválido. `aria-describedby` asocia el campo con el texto de ayuda y, cuando existe, con el mensaje de error. `role="alert"` anuncia el error al aparecer para que pueda percibirse sin depender solo de la presentación visual.

4. **¿Por qué `query`, `filter` y `sortBy` son estados controlados?**  
   Porque sus valores se guardan en el estado de React y los controles reciben esos valores mediante `value`; sus eventos notifican los cambios a través de las funciones actualizadoras. Así, los campos siempre coinciden con los criterios que la aplicación utiliza para obtener la lista visible.

5. **¿Por qué `visibleTasks` no debe almacenarse como estado independiente?**  
   Porque se deriva de `tasks`, `query`, `filter` y `sortBy`. Calcularla con `getVisibleTasks` durante el render evita mantener otra copia que podría quedar desincronizada cuando cambie alguno de esos datos.

6. **¿Cómo se normaliza una búsqueda?**  
   En `task-query.service.ts`, se eliminan los espacios al principio y al final con `trim()` y se convierte la consulta a minúsculas según la configuración regional `es-MX`. Los títulos también se pasan a minúsculas con la misma configuración y se comparan con `includes()`, lo que permite buscar una parte del título sin distinguir mayúsculas.

7. **¿Por qué se crea una copia antes de utilizar `sort`?**  
   Porque `sort` modifica el arreglo sobre el que se ejecuta. `[...filteredTasks].sort(...)` ordena una copia y evita mutar el arreglo recibido o los datos que podrían estar compartidos con el estado de React.

8. **¿Qué responsabilidad tiene `task-query.service.ts`?**  
   Encapsula la consulta de tareas: filtra por texto y estado, y ordena el resultado según el criterio seleccionado. Recibe las tareas y las opciones de vista, y devuelve una nueva lista visible sin encargarse de renderizar la interfaz ni cambiar el estado.

9. **¿Por qué el resultado de `JSON.parse` se trata como `unknown`?**  
   Porque los datos almacenados pueden haber sido modificados, estar corruptos o tener cualquier estructura; `JSON.parse` no garantiza que cumplan la interfaz `Task`. Al asignarlos a `unknown`, se exige validarlos antes de usarlos como tareas.

10. **¿Qué comprueba la función `isTask`?**  
    Comprueba que el valor sea un objeto y que incluya un `id` y un `title` de tipo `string`, un `status` permitido (`"pending"` o `"completed"`) y fechas `createdAt` y `updatedAt` que sean cadenas con fechas válidas. Solo entonces lo reconoce como una tarea.

11. **¿Qué ventaja ofrece la inicialización diferida de `useState`?**  
    `useState(() => loadTasks(initialTasks))` ejecuta la carga desde `localStorage` únicamente para inicializar el estado, en lugar de repetir esa lectura en cada renderizado. Esto evita trabajo innecesario y carga las tareas guardadas al iniciar la aplicación.

12. **¿Por qué `localStorage` se sincroniza mediante `useEffect`?**  
    Guardar datos es un efecto secundario, por lo que no debe hacerse durante el renderizado. El efecto en `App` guarda la colección cada vez que cambia `tasks`, manteniendo el almacenamiento sincronizado con el estado sin mezclar esa operación con la creación de la interfaz.

13. **¿Por qué `TaskSummary` recibe `tasks` y `TaskList` recibe `visibleTasks`?**  
    El resumen debe describir todas las tareas, independientemente de la búsqueda o el filtro activos. La lista, en cambio, debe mostrar solo las que coinciden con esos criterios; por eso `TaskSummary` recibe `tasks` y `TaskList` recibe `visibleTasks`.

14. **¿Qué información se pierde y cuál permanece al recargar?**  
    Las tareas se guardan en `localStorage` y permanecen al recargar si los datos guardados son válidos. La búsqueda, el filtro y el ordenamiento no se persisten: se inicializan de nuevo con sus valores predeterminados. Si el almacenamiento no existe o no contiene tareas válidas, se utilizan las tareas de respaldo de `initialTasks`.

15. **¿Qué dificultad encontraste y cómo la resolviste?**  
    Una dificultad fue tratar de forma segura los datos recuperados de `localStorage`, porque el contenido de `JSON.parse` no está garantizado como una colección de tareas válida. La resolví tipando inicialmente el resultado como `unknown`, comprobando que sea un arreglo y validando cada elemento con `isTask` antes de usarlo. Si no pasa esas comprobaciones, se cargan las tareas de respaldo en vez de confiar en datos incompatibles.
