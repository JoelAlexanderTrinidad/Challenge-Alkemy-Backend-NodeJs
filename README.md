# Challenge Alkemy | backend NodeJs

## Dependencias
Dependencias utilizadas en el proyecto:

    -"@sendgrid/mail": "^7.7.0",
    -"bcryptjs": "^2.4.3",
    -"dotenv": "^16.0.3",
    -"express": "^4.18.1",
    -"jsonwebtoken": "^8.5.1",
    -"morgan": "^1.10.0",
    -"mysql2": "^2.3.3",
    -"nodemon": "^2.0.20",
    -"sequelize": "^6.23.2",
    -"sequelize-cli": "^6.5.1"
## Instalación

Clonar el proyecto e instalar las dependencias
```
$ git clone https://github.com/JoelAlexanderTrinidad/Challenge-Alkemy-backend-NodeJs.git
$ cd Challenge-Alkemy-backend-NodeJs
$ npm install

```
Crear el arhivo <code>.env</code> y darle valor a las variables de entorno según corresponda.
```
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=disney_db
DB_PORT=3306
DB_HOST=127.0.0.1

NODE_ENV=development
PORT=3000
```
## Base de datos
***
### Crear la base de datos con **migraciones**
Es necesario tener instalado [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)
```
$ npm install --save-dev sequelize-cli
```
Crear la base de datos
```
$ sequelize db:create
```
Correr migraciones y seeders
```
$ sequelize db:migrate
$ sequelize db:seed:all
```

## Endpoints
Los endpoints hechos en Postman se encuentran en la raíz en el archivo llamado
Challenge Alkemy - backend Node js.postman_collection
```
$ Para poder realizar el CRUD correspondiente es necesario agregar el header 'x-access-token' 
$ con el valor &$ del token que se proporciona luego de haberse registrado y logeado.
```