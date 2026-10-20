# Preguntas de cierre — EC2-F2-A7

1. **¿Qué diferencia existe entre una variable local y el estado de React?**  
   Una variable local existe durante la ejecución de una función y se vuelve a inicializar cuando el componente se renderiza de nuevo. El estado de React se conserva entre renderizados; al actualizarlo con su función de actualización, React programa un nuevo renderizado para reflejar el cambio en la interfaz.

2. **¿Qué valores devuelve `useState`?**  
   Devuelve un par: el valor actual del estado y una función para actualizarlo. Por ejemplo, `const [title, setTitle] = useState("")` asigna el estado actual a `title` y su función actualizadora a `setTitle`.

3. **¿Por qué `useState` se declara en el nivel superior del componente?**  
   React necesita que los Hooks se llamen siempre en el mismo orden en cada renderizado para asociar cada estado con el Hook correcto. Por eso `useState` debe llamarse directamente en el cuerpo del componente, no dentro de condiciones, ciclos o funciones anidadas.

4. **¿Qué significa que un campo sea controlado?**  
   Significa que React mantiene su valor en el estado y lo actualiza mediante eventos. En `TaskForm`, el atributo `value={title}` muestra el estado `title` en el campo y `onChange` llama a `setTitle` cuando cambia el texto.

5. **¿Por qué `handleSubmit` utiliza `preventDefault`?**  
   Para impedir el envío tradicional del formulario, que recargaría la página. Así, la aplicación puede validar el título y actualizar su estado con React sin perder la interfaz actual.

6. **¿Cómo comunica `TaskForm` una nueva tarea a `App`?**  
   `App` pasa `handleAddTask` a `TaskForm` mediante la prop `onAddTask`. Cuando se envía un título válido, `TaskForm` llama a esa función con el título normalizado; `App` crea la tarea y actualiza la colección.

7. **¿Por qué `App` funciona como fuente de verdad?**  
   Porque mantiene la colección compartida en el estado `tasks` y pasa su valor a los componentes que la necesitan, como `TaskSummary` y `TaskList`. Las operaciones de agregar, editar, completar y eliminar actualizan ese estado central, evitando que cada componente mantenga una copia independiente de la colección.

8. **¿Cómo se implementa Create sin utilizar `push`?**  
   Se crea un nuevo arreglo con el operador spread y la tarea nueva: `[newTask, ...currentTasks]`. De esa manera no se modifica el arreglo anterior y la actualización inmutable permite que React detecte el cambio.

9. **¿Cómo permite `map` actualizar una sola tarea?**  
   `map` recorre todas las tareas y devuelve un nuevo arreglo. La función compara el `id` de cada una con el identificador seleccionado: para las demás devuelve la tarea sin cambios y para la coincidente devuelve un objeto nuevo con la propiedad que se actualiza, conservando las otras mediante spread.

10. **¿Cómo utiliza `filter` la operación Delete?**  
    `filter` construye un nuevo arreglo que conserva solo las tareas cuyo `id` no coincide con el que se quiere eliminar. `App` asigna ese arreglo mediante `setTasks`, por lo que la tarea seleccionada deja de aparecer.

11. **¿Por qué se emplea una función actualizadora en `setTasks`?**  
    La forma `setTasks((currentTasks) => ...)` calcula el siguiente estado a partir del estado más reciente que React proporciona. Esto evita depender de una copia potencialmente desactualizada y es especialmente apropiado cuando la actualización se basa en el valor anterior, como al agregar, editar o borrar tareas.

12. **¿Qué información conserva `TaskItem` como estado local?**  
    Conserva `isEditing`, que indica si la tarea está en modo de edición, y `draftTitle`, que guarda temporalmente el título escrito en el formulario de edición. Este borrador permite cancelar la edición sin cambiar el título de la tarea guardado en la colección de `App`.

13. **¿Por qué los cambios desaparecen al recargar la página?**  
    Porque la colección solo se conserva en el estado de React en memoria y se inicializa desde `initialTasks` al montar la aplicación. No se guarda en almacenamiento persistente ni se envía a un servidor; al recargar, el estado vuelve a inicializarse.

14. **¿Qué dificultad encontraste y cómo la resolviste?**  
    Una dificultad técnica de esta actividad es actualizar una sola tarea sin modificar directamente el arreglo ni sus objetos. Se resuelve usando `map` para crear una colección nueva, identificando la tarea por su `id` y copiando sus propiedades con spread antes de cambiar solo las necesarias. Para eliminar, se aplica el mismo principio inmutable con `filter`.
