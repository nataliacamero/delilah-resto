const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const informacionUsuario = { nombre : 'Natalia'}
const firma = 'MateitoGusi123'
const token = jwt.sign(informacionUsuario, firma);
console.log("token codificado: " , token);
const descodificado = jwt.verify(token, firma);
console.log("token descodificado: ", descodificado);
const validacion = require('./validacion');
const validacionUsuarioContrasena = validacion.validarAutenticacion;





app.listen(3000, () => console.log(`Servidor Delilah Restó iniciado!`));

//Configuracion Base de datos

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:Natalita@localhost:3306/Delilah_Resto');

//Creando tabla productos

const Productos = sequelize.define('productos',{
  nombre: Sequelize.STRING,
  imagen: Sequelize.STRING,
  precio: Sequelize.INTEGER
});

sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);

    Productos.bulkCreate([
      { nombre: 'Hamburguesa clasica', imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA', precio: 10000 },
      { nombre: 'Hamburguesa Veggi', imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA', precio: 20000 },
      { nombre: 'Hamburguesa con todo', imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA', precio: 30000 },
      { nombre: 'Hamburguesa de Cerdo', imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA', precio: 40000 },
      { nombre: 'Hamburguesa de aguacate', imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA', precio: 50000 },
      { nombre: 'Coca cola', imagen: 'SOY LA IMAGEN DE LA cocacola', precio: 5000 },
      { nombre: 'Agua', imagen: 'SOY LA IMAGEN DEL AGUA', precio: 3000 },
      { nombre: 'Limonada de Mango', imagen: 'SOY LA IMAGEN DE LA LIMONADA DE MANGO', precio: 9000 },
      { nombre: 'Limonada', imagen: 'SOY LA IMAGEN DE LA LIMONADA', precio: 5000 },
      { nombre: 'Cafe', imagen: 'SOY LA IMAGEN DEL CAFE', precio: 8000 }

    ]).then(function() {
      
      return Productos.findAll();
    }).then(function(productos) {
      // console.log(productos);
    });
});


//Creando tabla USUARIOS

const Usuarios = sequelize.define('usuarios',{
  nombre: Sequelize.STRING,
  apellido: Sequelize.STRING,
  email: Sequelize.STRING,
  telefono: Sequelize.STRING,
  direccioEnvio: Sequelize.STRING,
  password: Sequelize.STRING,
  rol: Sequelize.STRING
});

sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);

    Usuarios.bulkCreate([
      { nombre: 'Natalia', apellido: "Camero", email:"nataliacameroc@gmail.com", telefono: "3013606833", direccioEnvio:"Calle 145 # 46 78", password: "KJUBHYAS&&%TUGYGYJ", rol: "Administrador" },
      { nombre: 'Camilo', apellido: "Barrera", email:"camilobarrera@gmail.com", telefono: "3023445566", direccioEnvio:"Calle 1 # 56 99", password: "jg76ertwygbdsfy", rol: "usuario" },
      { nombre: 'Andres', apellido: "Ayala", email:"andresayala@gmail.com", telefono: "3036775477", direccioEnvio:"Carrera 45 # 8 67", password: "srfnw7ryiwhfjksdh", rol: "usuario" },
      { nombre: 'Gustavo', apellido: "Maggi", email:"gustavomaggi@gmail.com", telefono: "3057634387", direccioEnvio:"Calle 145 # 46 78", password: "jhgf77tqwyxnfjd", rol: "usuario" },
    ]).then(function() {
      
      return Usuarios.findAll();
    }).then(function(usuarios) {
      // console.log(usuarios);
    });
});





//Routes
app.use(express.json());

//Bienvenida
app.get('/', (req, res) => res.send('Delilah Restó App'));








//-------------------------PRODUCTOS---------------------------------------------------

//Get Usuarios

app.get('/usuarios', (req, res) => {
    
  sequelize.authenticate().then(async () => {
        
    const query = 'SELECT * FROM usuarios';
    const [resultados] =  await sequelize.query(query, { raw: true })
    console.log(resultados);
    res.json(resultados);
        
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

});



//Get USUARIO por id

app.get('/usuarios/:indiceUsuarios', (req, res) => {
 
  sequelize.authenticate().then(async () => {
    const indiceUsuarios = req.params.indiceUsuarios;
    const query = `SELECT * FROM usuarios WHERE id = ${indiceUsuarios}`;
    const [resultados] =  await sequelize.query(query, { raw: true })
    console.log(resultados);
    res.json(resultados);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

});


//Post, opcion de crear una nueva cuenta USUARIO

app.post('/usuarios', function(req, res) {
  Usuarios.create({ nombre: req.body.nombre, apellido: req.body.apellido, email: req.body.email, telefono: req.body.telefono , direccioEnvio: req.body.direccioEnvio, password: req.body.password, rol: req.body.rol }).then(function(nombre) {
    res.json(nombre);
    console.log("Usuario creado")
  });
});

//Put, actualizar USUARIO por id

app.put('/usuarios/:indiceUsuario', function(req, res) {

  const indiceUsuario = req.params.indiceUsuario;
  Usuarios.findByPk(req.params.indiceUsuario).then(function(nombre) {
    nombre.update({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      telefono: req.body.telefono,
      direccioEnvio: req.body.direccioEnvio,
      password: req.body.password,
      rol: req.body.rol
  }).then((nombre) => {
      res.json(nombre);
    });
  });
});

//Delete, borrar USUARIO por id

app.delete('/usuarios/:indiceUsuario', function(req, res) {
  const indiceUsuario = req.params.indiceUsuario;
  Usuarios.findByPk(req.params.indiceUsuario).then(function(nombre) {
    nombre.destroy();
  }).then((nombre) => {
    res.sendStatus(200);
  });
});

//-------------------------PRODUCTOS---------------------------------------------------

//Get productos

app.get('/productos', (req, res) => {

  sequelize.authenticate().then(async () => {

    const query = 'SELECT * FROM productos';
    const [resultados] =  await sequelize.query(query, { raw: true })
    console.log(resultados);
    res.json(resultados);    

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

});


//Get productos por id

app.get('/productos/:indiceProductos', (req, res) => {
 
  sequelize.authenticate().then(async () => {
    const indiceProductos = req.params.indiceProductos;
    const query = `SELECT * FROM productos WHERE id = ${indiceProductos}`;
    const [resultados] =  await sequelize.query(query, { raw: true })
    console.log(resultados);
    res.json(resultados);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

});


//Post, crear productos

app.post('/productos', function(req, res) {
  Productos.create({ nombre: req.body.nombre, imagen: req.body.imagen, precio: req.body.precio }).then(function(nombre) {
    res.json(nombre);
  });
});

//Put, actualizar producto por id

app.put('/productos/:indiceProductos', function(req, res) {

  const indiceProductos = req.params.indiceProductos;
  Productos.findByPk(req.params.indiceProductos).then(function(nombre) {
    nombre.update({
      nombre: req.body.nombre,
      imagen: req.body.imagen,
      precio: req.body.preecio
  }).then((nombre) => {
      res.json(nombre);
    });
  });
});

//Delete, borrar producto por id

app.delete('/productos/:indiceProductos', function(req, res) {
  const indiceProductos = req.params.indiceProductos;
  Productos.findByPk(req.params.indiceProductos).then(function(nombre) {
    nombre.destroy();
  }).then((nombre) => {
    res.sendStatus(200);
  });
});
//------------------------------------------------------------------------------------------------------------------



//Login

app.post('/login', (req, res) => {
  const {usuario, contrasena} = req.body;
  console.log(usuario);
  console.log(contrasena);
  console.log(validacionUsuarioContrasena(usuario, contrasena));
  
  const validacionUsuario = validacionUsuarioContrasena(usuario, contrasena);

  if (!validacionUsuario) {
    res.json({ error: "Usuario o contraseña incorrecta."});
    return;
  }

  const token = jwt.sign(usuario, contrasena);
  res.json(token);
  console.log(token)
});

//Metodo Seguro

const autenticarUsuario = (req, res, next) => {
console.log(req.headers.authorization);
console.log(req.headers.authorization.split(' ')[1]);
try{
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  const verificarToken = jwt.verify(token, firma);
  if(verificarToken){
    req.usuario = verificarToken;
    return next();
  }
} catch(error) {
  res.json({ error: "Error al validar el usuario."})
}
};

app.post('/seguro', autenticarUsuario, (req,res) => {
res.send(`Esta es una página autenticada. Hola ${req.usuario}`)
});
