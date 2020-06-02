# Delilah Restó API

Esta aplicacion permite interactuar con la iformacion de Delila restó, usuarios, productos y pedidos.

## Comenzando 🚀

Encontraras el repositorio en Github https://github.com/nataliacamero/delilah-resto.

### Pre-requisitos 📋

### Debes instalar los siguientes programas:

### Git
#
Encontraras el repositorio en Github https://github.com/nataliacamero/delilah-resto

Luego ejecuta:

```shell
    npm install nataliacamero/delilah-resto --save
```
#
### Node.js
#
Para [Node.js], Puedes descargarla en (https://nodejs.org/) y escoger la version segun tu sistema operativo.
#
### Npm
#
La libreria publica es [npm](https://www.npmjs.com/), por favor sigue el procedimiento in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Para correr el proyecto, una vez clonado el repositorio, mediante cd ubicate en la carpeta del repositorio y en el archivo package.json encontraras las dependencias que se necesitan, puedes instalarlas asi:

-npm install- mas la dependencia.
-npm init -v
#
### MySql Community Server
#
Puedes descargarla en https://dev.mysql.com/downloads/mysql/ y escoger la version segun tu sistema operativo.

#### Configuracion CONEXION base de datos
#
En el archivo delilah-resto/data/db-conexion.js, está la configuracion de la conexion a la BASE DE DATOS, allí, en la siguiente variable, se deben configurar los datos asi:

const sequelize = new Sequelize('mysql://user:password.@localhost:port/DatabaseName');


*example : const sequelize = new Sequelize('mysql://root:N4t4l1t4.@localhost:3306/Delilah_Resto')*

#
Los datos de la configuracion de la conexion, se ven aqui: 

![](/configuracion_conexion_mysql.jpg)
#
### Crea la Base de Datos Delilah_Resto

### script:

```
CREATE SCHEMA IF NOT EXISTS `Delilah_Resto` DEFAULT CHARACTER SET latin1 ;
USE `Delilah_Resto`;

```
#
### Instalación 🔧
#

Despues de instalar las dependencias, ejecuta el servidor con el siguiente comando:

- node index.js - veras el saludo de Delila Restoh en la consola : Servidor Delilah Restó iniciado!

Este comando, inicia el servidor, y  crea las tablas necesarias para el funcionamiento del proyecto.

#
## Ejecutando las pruebas ⚙️
#
Para guiarse sobre la informacion que se debe enviar en las pruebas, puede utilizar la herramienta https://editor.swagger.io/, y en file, importar el siguiente archivo: delilah-resto/openapi.yaml. Alli tendra una guia visual bastante completa sobre cada ruta y la informacion que requiere para funcionar.

Para hacer las pruebas, utilizamos nuestro servidor Local con las rutas, se sugiere utilizar el orden de las rutas para crear, loguear y autenticar un usuario, para que se genere el token y se decofifique, para tener acceso a las demas rutas. 
#
### Servidor Local
http://localhost:3000/

### Rutas:

### Crear, Loguear y Autenticar.

**POST** /usuarios | Crear un nuevo.  
*ejemplo: http://localhost:3000/usuarios*


**POST** /login | Autenticar un usuario.  
*ejemplo: http://localhost:3000/loguin*


**POST** /seguro | Autorizar a un usuario.  
*ejemplo: http://localhost:3000/seguro*


### El token se debe enviar siempre en el Header, para las siguientes rutas:

bearerAuth [ Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiTmF0YWxpYSIsIm5vbWJyZVVzdWFyaW8iOiJuYXRhbGlhY2FtZXJvY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IktKVUJIWUFTJiYlVFVHWUdZSiIsInJvbCI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE1OTA5MDQ3NDd9.1MRA90LfdEwk70FwOCya6TYFsSTLVV1TZsadYgrZpSA ]

### Usuarios:

**GET** /usuarios | Listar usuarios existentes.  
*ejemplo: http://localhost:3000/usuarios*
  
**GET** /usuarios/{id} | Traer un usuario por su id.   
*ejemplo: http://localhost:3000/usuarios/1*
  
**PUT** /usuarios/{id} | Actualizar a un usuario existente en la bd.  
*ejemplo: http://localhost:3000/usuarios/1*
  
**DELETE** /usuarios/{id} | EL Administrador borra a un usuario.  
*ejemplo: http://localhost:3000/usuarios/1*


### Productos:  
  
  
**POST** /productos | Crear productos  
*ejemplo: http://localhost:3000/productos*

**GET** /productos | Lista todos los productos de Delilah Resto.  
*ejemplo: http://localhost:3000/productos*

**GET** /productos/{id} | Lista los productos por su id.  
*ejemplo: http://localhost:3000/productos/1*

**PUT** /productos/{id} | Actualiza los productos por su id.).  
*ejemplo: http://localhost:3000/productos/1*

**DELETE** /productos/{id} | Borra un producto de uctosIdGet).
*ejemplo: http://localhost:3000/productos/1*  
  
    

### Pedidos:  
  
  

**POST** /pedidos | Crear pedidos.  
*ejemplo: http://localhost:3000/pedidos*

**GET** /pedidos | Lista todos los pedidos de Delilah Resto.  
*ejemplo: http://localhost:3000/pedidos*
    

**GET** /pedidos/{id} | Lista los pedidos por su id.  
*ejemplo: http://localhost:3000/pedidos/1*

**PATCH** /pedidos/{id} | Editar pedidos.  
*ejemplo: http://localhost:3000/pedidos/1*  

**DELETE** /pedidos/{id} | Borrar pedidos.  
*ejemplo: http://localhost:3000/pedidos/1*



#
### Analice las pruebas end-to-end 🔩

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

## Construido con 🛠️

* [Visual Studio Code](https://code.visualstudio.com/) - El editor de codigo usado.
* [Mysql Workbench](https://www.mysql.com/products/workbench/) - Interfaz Gráfica de mysql.
* [Postman](https://www.postman.com/) - Herramienta para interactuar con APIs.
* [Trello](https://trello.com/b/KjGfIKwQ/tareas-clases) - Herramienta para Organizar actividades.
* [Swagger](https://editor.swagger.io/) - Herramienta para generar la especificacion y muchas cosas mas.


## Autores ✒️ 🤓

* **Natalia Camero Carreño** - *Todo el trabajo* - [nataliacamero](https://github.com/nataliacamero)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/nataliacamero/delilah-resto/contributors) quíenes han participado en este proyecto. 

## Licencia 📄

Este proyecto está bajo la Licencia (MIT)

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* etc.



---
⌨️ con ❤️ por [Villanuevand](https://github.com/Villanuevand) 😊