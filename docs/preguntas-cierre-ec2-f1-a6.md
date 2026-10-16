# Preguntas de cierre — EC2-F1-A6

1. **¿Qué función cumple la interfaz `Task`?**  
   Define la estructura y los tipos de los datos de una tarea: `id`, `title`, `status`, `createdAt` y `updatedAt`. TypeScript la utiliza para comprobar que las tareas respeten ese contrato.

2. **¿Qué diferencia existe entre `Task` y `TaskStatus`?**  
   `Task` es una interfaz que describe una tarea completa; `TaskStatus` es un tipo unión que limita el estado a `"pending"` o `"completed"`. La propiedad `status` de `Task` utiliza ese tipo.

3. **¿Qué significa declarar un arreglo como `Task[]`?**  
   Significa que es una colección cuyos elementos deben cumplir la interfaz `Task`. Por ejemplo, `tasks: Task[]` acepta varias tareas, pero no valores de otros tipos.

4. **¿Qué hace el método `map`?**  
   Recorre los elementos de un arreglo y ejecuta una función para cada uno. Devuelve un nuevo arreglo con los resultados, sin modificar el arreglo original.

5. **¿Qué resultado produce `map` dentro de `TaskList`?**  
   `tasks.map((task) => <TaskItem key={task.id} task={task} />)` produce un arreglo de elementos React: uno por cada tarea. React los muestra como los elementos de la lista.

6. **¿Para qué utiliza React la propiedad `key`?**  
   La utiliza para identificar de forma única cada elemento de una lista entre renderizados. Esto le permite asociar los elementos correctamente cuando la colección cambia.

7. **¿Por qué se utiliza `task.id` y no el índice?**  
   El identificador pertenece a la tarea y se mantiene estable aunque cambie el orden o se agreguen o eliminen elementos. El índice depende de la posición y puede hacer que React asocie incorrectamente elementos cuando la lista cambia.

8. **¿Cómo se envía una tarea de `TaskList` a `TaskItem`?**  
   `TaskList` recorre la colección y pasa cada objeto en la prop `task`, con `<TaskItem task={task} />`. `TaskItem` declara esa prop como `Task` y la usa para presentar los datos.

9. **¿Cómo se comunican `App`, `TaskSummary` y `TaskList`?**  
   `App` importa la colección `tasks` y la pasa como prop tanto a `<TaskSummary tasks={tasks} />` como a `<TaskList tasks={tasks} />`. Ambos componentes reciben la misma colección para calcular el resumen y representar la lista, respectivamente. Los datos fluyen del componente padre a los hijos mediante props.

10. **¿Qué es el renderizado condicional?**  
    Es mostrar una parte u otra de la interfaz según una condición. En `TaskList`, si `tasks.length === 0`, se muestra el mensaje de lista vacía; si hay elementos, se renderiza la lista.

11. **¿Por qué el resumen se calcula a partir de la colección?**  
    Porque así el total y las cantidades pendientes y completadas corresponden a los datos que realmente se muestran. Evita mantener cifras separadas que podrían quedar desactualizadas si cambia la colección.

12. **¿Qué dificultad encontraste durante la refactorización y cómo la resolviste?**  
    Una dificultad fue asegurar que la colección y las props tuvieran el tipo correcto al separar la lista, cada elemento y el resumen en componentes. La resolví definiendo `Task` y tipos para las props, y pasando la misma colección desde `App`; así TypeScript ayuda a detectar datos incompatibles y los componentes permanecen sincronizados.
