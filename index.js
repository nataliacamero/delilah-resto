const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const uuid = require("uuid")
const jwt = require('jsonwebtoken')
const funciones = require('./funciones');
const Sequelize = require('sequelize');
const sequelize = require('./data/db-conexion');
const { autenticarUsuario }= require('./routes/middelwares');


//Configuracion Multer //Libreria para cargar las imagenes de productos
const storage = multer.diskStorage({
  destination: path.join(__dirname,'uploads/'), 
  filename:(req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname));
  }
});


//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(multer({//Libreria para cargar las imagenes de productos
  storage,
  dest: path.join(__dirname,'uploads/'),
  limits: {fieldSize:100000 }
}).single('image'));

app.use(autenticarUsuario);//Autenticacion
app.use(require('./routes/index.routes'))//Routes
app.listen(3000, () => console.log(`Servidor Delilah Restó iniciado!`));//Configuracion Servidor

app.use((err, req, res, next) => { //Manejo de errores genericos

  if(!err) return next();
  console.log('Error, algo salio mal', err);
  res.status(500).send('Error')

});