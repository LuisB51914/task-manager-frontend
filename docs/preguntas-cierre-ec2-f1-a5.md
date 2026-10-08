# Preguntas de cierre — EC2-F1-A5

1. **¿Qué problema resuelve React al construir una interfaz?**  
   React permite construir interfaces de manera declarativa y dividirlas en piezas reutilizables. Cuando cambian los datos, React actualiza la vista correspondiente sin tener que manipular manualmente todo el DOM.

2. **¿Qué es un componente?**  
   Es una pieza independiente de la interfaz que puede combinar estructura, presentación y, cuando se necesita, comportamiento. En este proyecto, `TaskItem` representa una tarea y `AppHeader` presenta la cabecera de la aplicación.

3. **¿Por qué los componentes comienzan con mayúscula?**  
   Es la convención de React para distinguir los componentes de las etiquetas HTML integradas, que comienzan con minúscula. Así, React interpreta `<TaskItem />` como un componente y `<section>` como una etiqueta HTML.

4. **¿Qué diferencia existe entre HTML y TSX?**  
   HTML es un lenguaje de marcado para describir la estructura de una página. TSX es una sintaxis de TypeScript que permite escribir una estructura similar a HTML dentro del código y combinarla con expresiones y componentes de React. TSX también aplica algunas reglas propias, como escribir `className` en vez de `class`.

5. **¿Para qué se utiliza `className`?**  
   Se utiliza en TSX para asignar clases CSS a los elementos y aplicarles estilos. Se llama `className` porque `class` es una palabra reservada de JavaScript.

6. **¿Qué son las propiedades o props?**  
   Son los valores que un componente recibe de su componente padre para mostrar información o adaptar su presentación. Por ejemplo, `TaskItem` recibe el título y el estado de una tarea.

7. **¿Cómo ayuda TypeScript a validar las propiedades?**  
   Permite declarar la forma y los tipos de las props, por ejemplo, que `title` sea un texto y que `status` solo pueda ser `"pending"` o `"completed"`. El editor y el compilador pueden señalar valores ausentes o incompatibles antes de ejecutar la aplicación.

8. **¿Cuál es la responsabilidad de `App.tsx`?**  
   Es el componente que organiza la pantalla principal y compone la interfaz con los demás componentes. En esta versión reúne la cabecera, el formulario, los filtros, el resumen y la lista de tareas.

9. **¿Por qué la interfaz se dividió en varios componentes?**  
   Para asignar a cada parte una responsabilidad concreta, facilitar su lectura y permitir reutilizar o modificar una sección sin tener que cambiar toda la pantalla. Por ejemplo, cada tarea de la lista puede representarse con el mismo `TaskItem`.

10. **¿Por qué los botones todavía están deshabilitados?**  
    Porque esta entrega contiene la estructura visual, pero todavía no implementa las acciones ni su lógica. El README indica que los formularios, filtros y acciones se habilitarán en una actividad posterior; deshabilitar los botones evita ofrecer interacciones que aún no funcionan.

11. **¿Qué componente consideras más reutilizable y por qué?**  
    `TaskItem`, porque puede mostrar distintas tareas usando las props `title` y `status`, manteniendo la misma estructura y adaptando el texto y los estilos al estado de cada una.

12. **¿Qué dificultad encontraste y cómo la resolviste?**  
    Una dificultad fue entender cómo pasar datos a un componente y asegurar que tuvieran el tipo correcto. La resolví definiendo una interfaz para las props y usando esos valores desde el componente; así, `TaskItem` puede mostrar títulos y estados distintos con una estructura común.
