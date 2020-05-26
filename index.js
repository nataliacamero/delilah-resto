const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const uuid = require("uuid")
const jwt = require('jsonwebtoken')
const informacionUsuario = { nombre : 'Natalia'}
const firma = 'MateitoGusi123'

//Cofiguracion del servidor

app.listen(3000, () => console.log(`Servidor Delilah Restó iniciado!`));

//Configuracion Base de datos

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:N4t4l1t4.@localhost:3306/Delilah_Resto');


//Configuracion Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname,'uploads/'), 
  filename:(req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname));
  }
});


//Metodo Seguro

const autenticarUsuario = (req, res, next) => {
  if (req.path === '/usuarios/crear' || req.path === '/' || req.path === '/login' ) return next();
  
  if (!req.headers.authorization) { // y no esta en la base de datos
    res.json({ error: "No te has logeado"})
  } else {
    
    try{
      console.log("Linea 140: ",req.headers.authorization);
      console.log("Linea 141: ",req.headers.authorization.split(' ')[1]);
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const verificarToken = jwt.verify(token, firma);
      console.log("verificando",verificarToken)
      if(verificarToken){
        req.usuario = verificarToken;
        return next();
      }
    } catch(error) {
      res.json({ error: "Error al validar el usuario."})
    }
  }
};

//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(multer({
  storage,
  dest: path.join(__dirname,'uploads/'),
  limits: {fieldSize:100000 }
}).single('image'));

app.use(autenticarUsuario);


//Routes
app.use(require('./routes/index.routes'))

