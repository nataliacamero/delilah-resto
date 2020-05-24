const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const informacionUsuario = { nombre : 'Natalia'}
const firma = 'MateitoGusi123'
const ROLES = {
      ADMIN: 'Administrador',
      BASIC: 'usuarioBasico'
    }
const asyncHandler = require('express-async-handler');
  

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

//Creando tabla Producto

const Producto = sequelize.define('producto',{
  nombreProducto: Sequelize.STRING,
  imagen: Sequelize.STRING,
  precio: Sequelize.INTEGER
});

sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);

    Producto.bulkCreate([
      { nombreProducto: 'Hamburguesa clasica', imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA', precio: 10000 },
      { nombreProducto: 'Hamburguesa Veggi', imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA', precio: 20000 },
      { nombreProducto: 'Hamburguesa con todo', imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA', precio: 30000 },
      { nombreProducto: 'Hamburguesa de Cerdo', imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA', precio: 40000 },
      { nombreProducto: 'Hamburguesa de aguacate', imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA', precio: 50000 },
      { nombreProducto: 'Coca cola', imagen: 'SOY LA IMAGEN DE LA cocacola', precio: 5000 },
      { nombreProducto: 'Agua', imagen: 'SOY LA IMAGEN DEL AGUA', precio: 3000 },
      { nombreProducto: 'Limonada de Mango', imagen: 'SOY LA IMAGEN DE LA LIMONADA DE MANGO', precio: 9000 },
      { nombreProducto: 'Limonada', imagen: 'SOY LA IMAGEN DE LA LIMONADA', precio: 5000 },
      { nombreProducto: 'Cafe', imagen: 'SOY LA IMAGEN DEL CAFE', precio: 8000 }

    ]).then(function() {
      
      return Producto.findAll();
    }).then(function(Producto) {
      // console.log(Producto);
    });
});


//Creando tabla USUARIOS

const Usuario = sequelize.define('usuario',{
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

    Usuario.bulkCreate([
      { nombre: 'Natalia', apellido: "Camero", email:"nataliacameroc@gmail.com", telefono: "3013606833", direccioEnvio:"Calle 145 # 46 78", nombreUsuario: "nataliacameroc@gmail.com", password: "KJUBHYAS&&%TUGYGYJ", rol: "Administrador" },
      { nombre: 'Camilo', apellido: "Barrera", email:"camilobarrera@gmail.com", telefono: "3023445566", direccioEnvio:"Calle 1 # 56 99", nombreUsuario: "camilobarrera@gmail.com", password: "jg76ertwygbdsfy", rol: "usuarioBasico" },
      { nombre: 'Andres', apellido: "Ayala", email:"andresayala@gmail.com", telefono: "3036775477", direccioEnvio:"Carrera 45 # 8 67", nombreUsuario: "andresayala@gmail.com", password: "srfnw7ryiwhfjksdh", rol: "usuarioBasico" },
      { nombre: 'Gustavo', apellido: "Maggi", email:"gustavomaggi@gmail.com", telefono: "3057634387", direccioEnvio:"Calle 145 # 46 78", nombreUsuario: "gustavomaggi@gmail.com", password: "jhgf77tqwyxnfjd", rol: "usuarioBasico" },
    ]).then(function() {
      
      return Usuario.findAll();
    }).then(function(usuario) {
      // console.log(usuarios);
    });
});


//Creando Tabla Pedido

const Pedido = sequelize.define('pedido',{
  fecha: Sequelize.DATE,
  tipo_pago: Sequelize.STRING,
  estado: Sequelize.STRING
});

const Pedidos_Producto = sequelize.define('pedidos_producto', {
  cantidad: Sequelize.INTEGER,
  precio: Sequelize.INTEGER
  
});
//Relacion uno a muchos Usuarios-Pedido

Usuario.hasMany(Pedido);


//Relacion Muchos a Muchos Pedido-Producto

Producto.belongsToMany(Pedido, { through: Pedidos_Producto, as:'pedidos', foreignKey: 'prouctoId', otherKey: 'pedidoId' });
Pedido.belongsToMany(Producto, { through: Pedidos_Producto, as: 'productos', foreignKey: 'pedidoId', otherKey: 'productoId' });



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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
  if (!req.headers.authorization) { // y no esta en la base de datos
    res.json({ error: "No te has logeado"})
  } else {
    console.log("Linea 140: ",req.headers.authorization);
    console.log("Linea 141: ",req.headers.authorization.split(' ')[1]);
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
  }
};



app.post('/seguro', autenticarUsuario, (req,res) => {
res.send(`Esta es una página autenticada. Hola ${req.usuario.nombre}. Tu rol es ${req.usuario.rol}`)
});


// Verificar rol
function authRole(role) {
  
  return (req, res, next) => {
    console.log("Linea 167: ",req.usuario.rol.toString())
    if (req.usuario.rol !== role) {
      res.status(401)
      return res.send('No es permitido el acceso a este recurso.')
    }

    next()
  }
}


//-------------------------Usuarios---------------------------------------------------

//Get Usuarios

app.get('/usuarios', autenticarUsuario, authRole(ROLES.ADMIN), (req, res) => {
  
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
    const queryIdUsuario = `SELECT id FROM usuarios WHERE id = ${indiceUsuarios}` 
    const query = `SELECT * FROM usuarios WHERE id = ${indiceUsuarios}`;
    const [idResults] = await sequelize.query(queryIdUsuario, { raw: true });
    const [resultados] = await sequelize.query(query, { raw: true });

    console.log(typeof indiceUsuarios);
    console.log("Linea 210: ", idResults[0].id.toString());
    console.log(indiceUsuarios === idResults[0].id.toString());
    console.log(resultados);

    if(indiceUsuarios === idResults[0].id.toString()){
      console.log("estoy validando")
      res.json(resultados);
    } else {
      res.send('No es permitido el acceso a este recurso.')
    }
  
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

});

//Post, opcion para crear una nueva cuenta USUARIO, valida en bd si ya existe el nombreUsuario si no, se crea por defecto con rol de usuarioBasico.

app.post('/usuarios', function(req, res) {

  sequelize.authenticate().then(async () => {
      
    const query = `SELECT nombreUsuario FROM usuarios WHERE nombreUsuario = ${JSON.stringify(req.body.nombreUsuario)}` 
    const [resultados] = await sequelize.query(query, { raw: true });

    console.log(resultados);

    if(resultados.length > 0 ){
      res.send('El usuario ya existe en la base de datos');
    } else {
      Usuarios.create({ nombre: req.body.nombre, apellido: req.body.apellido, email: req.body.email, telefono: req.body.telefono , direccioEnvio: req.body.direccioEnvio, nombreUsuario: req.body.nombreUsuario, password: req.body.password, rol: ROLES.BASIC }).then(function(nombre) {
        res.json(nombre);
        console.log("Usuario creado")
      });
    }
  
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
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
      rol: ROLES.BASIC
  }).then((nombre) => {
      res.json(nombre);
    });
  });
});



//Delete, borrar USUARIO por id

app.delete('/usuarios/:indiceUsuario', autenticarUsuario, authRole(ROLES.ADMIN), function(req, res) {
  const indiceUsuario = req.params.indiceUsuario;
  Usuarios.findByPk(req.params.indiceUsuario).then(function(nombre) {
    nombre.destroy();
  }).then((nombre) => {
    res.sendStatus(200);
  });
});

//-------------------------Producto---------------------------------------------------

//Get Producto

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

app.post('/productos', autenticarUsuario, authRole(ROLES.ADMIN), function(req, res) {
  Productos.create({ nombreProducto: req.body.nombre, imagen: req.body.imagen, precio: req.body.precio }).then(function(nombre) {
    res.json(nombre);
  });
});

//Put, actualizar producto por id

app.put('/productos/:indiceProductos', autenticarUsuario, authRole(ROLES.ADMIN), function(req, res) {

  const indiceProductos = req.params.indiceProductos;
  Productos.findByPk(req.params.indiceProductos).then(function(nombre) {
    nombre.update({
      nombreProducto: req.body.nombre,
      imagen: req.body.imagen,
      precio: req.body.precio
  }).then((nombre) => {
      res.json(nombre);
    });
  });
});

//Delete, borrar producto por id

app.delete('/productos/:indiceProductos', autenticarUsuario, authRole(ROLES.ADMIN), function(req, res) {
  const indiceProductos = req.params.indiceProductos;
    Productos.findByPk(req.params.indiceProductos).then(function(nombre) {
      nombre.destroy();
    }).then((nombre) => {
      res.sendStatus(200);
    });
});

//-------------------------------------PEDIDOS---------------------------------------------------------------------------

//Crear pedido
app.post('/pedidos/crear', async (req, res) => {
  
  try {
      //Crear y guardar el pedido
      const guardarPedido = await Pedido.create (req.body, {w:1}, { returning: true});
      
      //Recorro todos los productos en req.productos
      
      req.body.productos.forEach(async(item) => {
        //Buscar el producto con el Id que dieron y asegurarme si existe. Si no, responder con status 400.
        const producto = await Producto.findByPk(item.id);
        // if(!producto) throw new Error("Este producto no existe");
        
        //Creo un diccionario con el cual crear el Pedidos_Producto
        const pedidoProducto = {
          pedidoId: guardarPedido.id,
          productoId: item.id,
          cantidad: item.cantidad,
          precio: item.precio
        }
        //Crear y guardar un pedidoProducto
        guardarPedidoProducto = await Pedidos_Producto.create(pedidoProducto, { w:1 }, {returning:true});
        if(!guardarPedidoProducto) throw new Error("No se pudo guardar en la tabla de pedidos_producto");

      });
      console.log("sali del foreach")
   
      if (!guardarPedido)   throw new Error(`No fue posible guardar el producto ${item.id} en le pedido ${pedidoProducto.pedidoId}`);
      
      return res.status(200).json(guardarPedido);
      
  } catch (e) { console.log(e); }
  
});

// //Get obtenemos toda la informacion de Pedidos y productos

app.get('/pedidos', asyncHandler (async (req, res) => {

  //Obtener todos los pedidos
  const todoPedidos = await Pedido.findAll({
    
    //Asegurarse de incluir los productos
    include: [{
      model: Pedido,
      as: 'pedidos',
      required: false,
      //Pasar los atributos del produto que deseo traer
      attributes: [  'id', 'fecha','tipo_pago', 'estado' ],
      through: {
        //El codigo a continuacion, trae las propiedades de la tabla de union
        model: Pedidos_Producto,
        as: 'pedidos_producto',
        attributes: ['cantidad', 'precio']
      }
    }]
  });

   //Si todo esta bien
   return respondWith(res, 200, ['Returning all orders'], {todoPedidos});
}));


  // sequelize.authenticate().then(async () => {

  //   const query = `SELECT * FROM pedidos JOIN pedidos_productos
  //    ON pedidos.id = pedidos_productos.pedidoId JOIN productos 
  //    ON pedidos_productos.productoId = productos.id 
  //    ORDER BY pedidos.id ASC`;
  //   const [resultados] =  await sequelize.query(query, { raw: true })
  //   console.log(resultados);
  //   res.json(resultados);    

  // })
  // .catch(err => {
  //   console.error('Unable to connect to the database:', err);
  // });

// });

//Actualizar Estado de pedidos

//Put, actualizar pedido por id

app.put('/productos/:indicePedido', function(req, res) {

  const indicePedidos = req.params.indicePedido;
  Pedido.findByPk(req.params.indicePedido).then(function(nombre) {
    nombre.update({
      fecha: req.body.fecha,
      tipo_pago: req.body.tipo_pago,
      estado: req.body.estado
  }).then((nombre) => {
      res.json(nombre);
    });
  });
});


