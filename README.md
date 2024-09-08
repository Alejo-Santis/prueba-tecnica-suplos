# Prueba Técnica - Sistema de Gestión de Tareas

## Descripción del Proyecto

Este proyecto es un sistema básico de gestión de tareas desarrollado con Laravel y Vue.js. El objetivo de esta prueba técnica es identificar y corregir errores en el código tanto en el backend como en el frontend. El sistema permite a los usuarios crear, actualizar, eliminar y visualizar tareas.

## Objetivo de la Prueba

El objetivo principal de esta prueba es evaluar tus habilidades para depurar y corregir errores en un proyecto existente que utiliza Laravel, PHP, JavaScript, y Vue.js. Deberás:

- Identificar y corregir errores en el backend relacionado con la creación, actualización, eliminación y validación de tareas.
- Corregir problemas en el frontend que afectan la visualización y manejo de la lista de tareas.
- Asegurarte de que las tareas se gestionen correctamente en la interfaz de usuario.

Además, deberás agregar una funcionalidad extra para filtrar las tareas completadas y pendientes.

## Instrucciones de Instalación

Sigue los siguientes pasos para configurar el proyecto en tu entorno local:


1. **Clona el repositorio:**

       Prueba-Soporte
   
2. **Instala las dependencias de PHP y Node.js:**

   .Composer: Para instalar las dependencias de PHP, ejecuta:
   
        composer install

   .NPM: Para instalar las dependencias de Node.js, ejecuta:

        npm install
        npm run dev

3. **Configura el archivo de entorno .env:**

   .Copia el archivo .env.example a .env:

       cp .env.example .env
   
   .Genera la clave de la aplicación:

       php artisan key:generate
   
   .Configura la base de datos en el archivo .env. Asegúrate de tener una base de datos MySQL disponible y configurada.
   
4. **Ejecuta las migraciones para crear las tablas necesarias:**

       php artisan migrate
       php artisa db:seed

5. **Compilar Recursos de Frontend:**

   .Compila los archivos de frontend utilizando Laravel Mix:

       npm run dev

6. **Iniciar el Servidor:**

   .Inicia el servidor de desarrollo de Laravel:

       php artisan serve

       
**Objetivo de la Prueba**

El proyecto contiene errores tanto en el backend (Laravel/PHP) como en el frontend (JavaScript). Tu objetivo es:

 1.Identificar los errores en el código.
 2.Corregir los errores para que la aplicación funcione correctamente.
 3.Probar la aplicación después de realizar las correcciones para asegurarte de que todo funcione como se espera.
 
**Entrega**

Sube el código corregido a un repositorio de GitHub y envíanos el enlace. Asegúrate de describir los problemas que encontraste y cómo los solucionaste en este archivo README.md.

**Notas**

Puedes añadir cualquier comentario adicional sobre las decisiones que tomaste al corregir el código.
Recuerda que el objetivo es demostrar tu capacidad para depurar y mejorar código existente.

¡Buena suerte!
   

# Solución de la Prueba Tecnica.

## 1. **Identificación de errores y Cambios realizados**:

    * Migrations: por convención las tablas deben denominarse en plural.
    * Factories: en la clase UserFactory se estaba importando el modelo `User` de manera equivocada `use App\User -> incorrecto`, `use App\Models\User`.
    * Models: En la clase que representa el modelo `Task` la relación con el modelo `User` estaba incorrecta se estaba definiendo así `$this->belongsTo('App\Models\User', 'user_id'); -> incorrecto` debe definirse así `return $this->belongsTo(User::class, 'user_id'); tambien se estaba validando en la asignación masiva la propiedad `user` y en la migración se define la llave forena `user_id` es decir el campo no estaba correcto.
    * Controllers: En el TaskController en el metodo `Store` no es necesario validar un email que no se envia por el request.
    * En la parte de frontend no estaba definido el complete task, tambien se reparo la propiedad `user` que al guardar en el front no permitia guardar el usuario pues se deberia almacenar el `user_id`.

    * **Cambios**

    * En el archivo store se agregaron `fetchUsers`, `fetchTasks` y `completeTask`, se agrego el arreglo `users: []` para mandar los datos al componente de Vue y algunas caracteristicas para el consumo de los servicios `rest` de manera correcta en el frontend.
    * En el componente de Vue se modificaron algunos campos primero para simular una selección o asignación de Tareas a usuarios, con usuarios Fake en el seeder de Laravel y que se presenten en el front como un select para la vista del usuario creador de las tareas en el sistema.
    * En la parte del backend se cambiaron los metodos para que retornen las respuestas en formato `json`, tambien se modificaron las rutas del archivo `web.php` al archivo `api.php` para mejor estructuración ya que el backend debe responder en formato json y el frontend debe tomar esos datos y pintarlos en la mejor forma de trabajar en proyectos.
    * Se creo el `UserController`para consultar información sobre los usuarios fake creados en el seeder de la aplicación.