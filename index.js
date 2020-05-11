const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const informacionUsuario = { nombre : 'Natalia'}
const firma = 'MateitoGusi123'
// const token = jwt.sign(informacionUsuario, firma);
// console.log("token codificado: " , token);
// const descodificado = jwt.verify(token, firma);
// console.log("token descodificado: ", descodificado);
// const validacion = require('./validacion');
// const validacionUsuarioContrasena = validacion.validarAutenticacion;





app.listen(3000, () => console.log(`Servidor Delilah Restó iniciado!`));

//Configuracion Base de datos

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:N4t4l1t4.@localhost:3306/Delilah_Resto');



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
  nombreUsuario: Sequelize.STRING,
  password: Sequelize.STRING,
  rol: Sequelize.STRING
});

sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);

    Usuarios.bulkCreate([
      { nombre: 'Natalia', apellido: "Camero", email:"nataliacameroc@gmail.com", telefono: "3013606833", direccioEnvio:"Calle 145 # 46 78", nombreUsuario: "nataliacameroc@gmail.com", password: "KJUBHYAS&&%TUGYGYJ", rol: "Administrador" },
      { nombre: 'Camilo', apellido: "Barrera", email:"camilobarrera@gmail.com", telefono: "3023445566", direccioEnvio:"Calle 1 # 56 99", nombreUsuario: "camilobarrera@gmail.com", password: "jg76ertwygbdsfy", rol: "usuarioBasico" },
      { nombre: 'Andres', apellido: "Ayala", email:"andresayala@gmail.com", telefono: "3036775477", direccioEnvio:"Carrera 45 # 8 67", nombreUsuario: "andresayala@gmail.com", password: "srfnw7ryiwhfjksdh", rol: "usuarioBasico" },
      { nombre: 'Gustavo', apellido: "Maggi", email:"gustavomaggi@gmail.com", telefono: "3057634387", direccioEnvio:"Calle 145 # 46 78", nombreUsuario: "gustavomaggi@gmail.com", password: "jhgf77tqwyxnfjd", rol: "usuarioBasico" },
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


//Login

app.post('/login', (req, res) => {

  let {nombreUsuario, password} = req.body;
  console.log("Linea 103", nombreUsuario);
  console.log("Linea 104", password);

  sequelize.authenticate().then(async () => {
    let {nombreUsuario, password} = req.body;
    const query = `SELECT nombre,nombreUsuario,password,rol FROM Delilah_Resto.usuarios WHERE nombreUsuario = ${JSON.stringify(nombreUsuario)} AND password = ${JSON.stringify(password)};`;
    const [resultados] =  await sequelize.query(query, { raw: true })
    console.log(resultados);
    if (resultados.length > 0) {
      const token = jwt.sign({nombre: resultados[0].nombre, password: password, rol: resultados[0].rol}, firma);
      res.json(token);
      console.log(token)
      console.log("Linea 115: ", resultados[0].nombre);
      console.log("Linea 116: ", resultados[0].password);
      console.log("Linea 117: ", resultados[0].rol);
      return
    } else {
      res.json({ error: "Usuario o contraseña incorrecta."});
      return
    }
  })
});


//Metodo Seguro

const autenticarUsuario = (req, res, next) => {
console.log("Linea 130: ",req.headers.authorization);
console.log("Linea 131: ",req.headers.authorization.split(' ')[1]);
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
res.send(`Esta es una página autenticada. Hola ${req.usuario.nombre}. Tu rol es ${req.usuario.rol}`)
});


// Verificar rol
function authRole(role) {

 return (req, res, next) => {
   if (req.usuario.rol !== role) {
     res.status(401)
     return res.send('Not allowed')
  
   next()
 }

};








//-------------------------PRODUCTOS---------------------------------------------------

//Get Usuarios

app.get('/usuarios', autenticarUsuario, (req, res) => {
    
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

app.get('/usuarios/:indiceUsuarios', autenticarUsuario, (req, res) => {
 
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

app.post('/usuarios', autenticarUsuario, function(req, res) {
  Usuarios.create({ nombre: req.body.nombre, apellido: req.body.apellido, email: req.body.email, telefono: req.body.telefono , direccioEnvio: req.body.direccioEnvio, nombreUsuario: req.body.nombreUsuario, password: req.body.password, rol: req.body.rol }).then(function(nombre) {
    res.json(nombre);
    console.log("Usuario creado")
  });
});

//Put, actualizar USUARIO por id

app.put('/usuarios/:indiceUsuario', autenticarUsuario, function(req, res) {

  const indiceUsuario = req.params.indiceUsuario;
  Usuarios.findByPk(req.params.indiceUsuario).then(function(nombre) {
    nombre.update({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      telefono: req.body.telefono,
      direccioEnvio: req.body.direccioEnvio,
      nombreUsuario: req.body.nombreUsuario,
      password: req.body.password,
      rol: req.body.rol
  }).then((nombre) => {
      res.json(nombre);
    });
  });
});

//Delete, borrar USUARIO por id

app.delete('/usuarios/:indiceUsuario', autenticarUsuario, function(req, res) {
  const indiceUsuario = req.params.indiceUsuario;
  Usuarios.findByPk(req.params.indiceUsuario).then(function(nombre) {
    nombre.destroy();
  }).then((nombre) => {
    res.sendStatus(200);
  });
});

//-------------------------PRODUCTOS---------------------------------------------------

//Get productos

app.get('/productos', autenticarUsuario, (req, res) => {

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

app.get('/productos/:indiceProductos', autenticarUsuario, (req, res) => {
 
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

app.post('/productos', autenticarUsuario, function(req, res) {
  Productos.create({ nombre: req.body.nombre, imagen: req.body.imagen, precio: req.body.precio }).then(function(nombre) {
    res.json(nombre);
  });
});

//Put, actualizar producto por id

app.put('/productos/:indiceProductos', autenticarUsuario, function(req, res) {

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

app.delete('/productos/:indiceProductos', autenticarUsuario, function(req, res) {
  const indiceProductos = req.params.indiceProductos;
  Productos.findByPk(req.params.indiceProductos).then(function(nombre) {
    nombre.destroy();
  }).then((nombre) => {
    res.sendStatus(200);
  });
});
//------------------------------------------------------------------------------------------------------------------

