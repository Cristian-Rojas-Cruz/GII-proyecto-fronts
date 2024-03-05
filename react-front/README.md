
# Entrega React




## Frontend

### Estructura del proyecto del frontend.
- public/
- src/
  - pages/
  - components/
  - styles/
  - utils/
  - index.tsx
  - Router.tsx

<strong>CSS</strong>
En la creación de los estilos se decicio usar la metodologia BEM para facilidad de lectura en el codigo, se utilizo CSS custom para para todo el proyecto por que hizo falta implementar clases tipicas como container de bootstrap.

Aparte de los 3 archivos de css especificos de cada documento html

<strong>HTML</strong>
Se priorizo el utilizar elementos HTML antes de implementar funciones custom con Javascript, el ejemplo de esto es el uso de los diferentes atributos como "placeholder" o "required" de los formularios que a veces son ignorados a la hora de programar.

<strong>Javascript</strong>
En el uso de javascript para las peticiones en vez de usar axios libreria que facilita la comunicación http se decidio utilzar herramientas ya integradas en javascript que es la función fetch.


## Entrega 2

Para la estructura general del proyecto se dejo la estructura general del proyecto frontend y backend pero tambien se añadio un docker-compose.yml para facilitar el desarrollo.

Para utilizar este solo necesitas correr el comando "docker compose up -d" esto genera el servicio, crea la base de datos y <strong> agrega los roles iniciales </strong>, por lo que lo hace importante si no se usa este comando tener en cuenta realizar estas cosas antes de correr el proyecto. 

Para este segundo proyecto se cambio la estructura del backend para facilitar el desarrollo de esta misma.
- src
    - api
        - controllers
        - middlewares
        - routes
    - config
    - data
        - repository
        - schemas
    - services
    - utils
    - index.js
    - .env
    - mongo-init.js

Se instalo la libreria mongoose que servio como "ORM" que ayudará a comunicarnos con mongodb.

Se hizo una actualización al archivo de configuración, ahora en vez de tener las credenciales quemadas son traidas desde un .env.

Un cambio clave que se hizo es utilizar los modelos de Mongo en vez de usar los de Sequelize, por lo que se creo el schema de ambas collecciones 

Hizo falta reescribir la logica de los middlewares y los controladores para que funcionara.

La estructura del frontend se quedo igual que en la primera version del proyecto.

Estructura del backend.
- app: Esta carpeta principal contiene los módulos esenciales del backend, como configuraciones, controladores, modelos y rutas.  
    - config: En esta carpeta se encuentran archivos relacionados con la configuración del proyecto, como la configuración de la base de datos.
    - controllers: Aquí se almacenan los controladores, que son responsables de manejar las operaciones lógicas de la aplicación, como el manejo de solicitudes HTTP.
    - models: La carpeta models contiene los modelos de la base de datos utilizando Sequelize, proporcionando una estructura para interactuar con la base de datos.
    - routes: En esta carpeta se definen las rutas de la aplicación, estableciendo cómo se manejan las solicitudes HTTP y cómo interactúan con los controladores.
- server.js: Este archivo sirve como punto de entrada principal para el servidor. Contiene la configuración y la inicialización del servidor Express, conectándose a la base de datos y estableciendo las rutas.