# ConcursoRobotica

Debe estar corriendo la base de datos y el servidor de Apache para poder importar los comandos SQL que se encuentran en el archivo ConcursoRobotica.sql en una base de datos con el mismo nombre del archivo, esto haciendo uso de la interfaz de PHPMyAdmin, la cual ofrece la opción de importar los datos ya creada y seleccionada la base de datos.

Esto permitirá configurar el archivo .env en la carpeta raíz del servidor express con los datos necesarios:
- El nombre de la base de datos estará en la variable DB_DATABASE.
- El usuario (usualmente es root) en la variable DB_USER.
- La contraseña (si no creó contraseña para la base de datos se queda vacía) en la variable DB_PASSWORD.
- El host (si la base de datos se encuentra en la misma computadora en la que se ejecutará el servidor express, el host es localhost) en la variable DB_HOST.
- El puerto (usualmente es 3306) en la variable DB_PORT.

También, en el archivo .env, debe existir una variable SECRET_TOKEN que tendrá la clave secreta para codificar y decodificar los tokens que se creen con la librería jsonwebtoken. Y para el correcto funcionamiento del sistema se debe crear una variable vacía con el nombre de TOKEN_USUARIO.

Para finalizar la instalación del sistema, sólo necesita ejecutar el servidor con el comando “npm start” desde una terminal.
