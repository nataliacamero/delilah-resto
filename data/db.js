const Sequelize = require('sequelize');
const sequelize = require('./db-conexion');
const ROLES = {
  ADMIN: 'Administrador',
  BASIC: 'usuarioBasico'
};

//Creando tabla Producto

const Producto = sequelize.define('producto',{
  nombreProducto: Sequelize.STRING,
  imagen: Sequelize.STRING,
  precio: Sequelize.INTEGER
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
//Creando Tabla Pedido

const Pedido = sequelize.define('pedido',{
  fecha: Sequelize.DATE,
  tipo_pago: Sequelize.STRING,
  estado: Sequelize.STRING,
  precioFinal: Sequelize.INTEGER
});

const Pedidos_Producto = sequelize.define('pedidos_producto', {
  cantidad: Sequelize.INTEGER,
});




async function crearTablas() {
  //Relacion uno a muchos Usuarios-Pedido
  Usuario.hasMany(Pedido);
  //Relacion Muchos a Muchos Pedido-Producto
  Producto.belongsToMany(Pedido, { through: Pedidos_Producto, as:'pedidos', foreignKey: 'prouctoId', otherKey: 'pedidoId' });
  Pedido.belongsToMany(Producto, { through: Pedidos_Producto, as: 'productos', foreignKey: 'pedidoId', otherKey: 'productoId' });
  
  await sequelize.sync({ force: true });
   
  await Producto.bulkCreate([
      
    { nombreProducto: 'Hamburguesa clasica', imagen: '/home/natalita/Escritorio/Proyecto Delilah-Resto/delilah-resto/uploads/134c4cd6-53d8-4b56-9d0e-a2ff0b461f51.png', precio: 10000 },
    { nombreProducto: 'Hamburguesa Veggi', imagen: '/home/natalita/Escritorio/Proyecto Delilah-Resto/delilah-resto/uploads/134c4cd6-53d8-4b56-9d0e-a2ff0b461f51.png', precio: 20000 },
    { nombreProducto: 'Hamburguesa con todo', imagen: '/home/natalita/Escritorio/Proyecto Delilah-Resto/delilah-resto/uploads/134c4cd6-53d8-4b56-9d0e-a2ff0b461f51.png', precio: 30000 },
    { nombreProducto: 'Hamburguesa de Cerdo', imagen: '/home/natalita/Escritorio/Proyecto Delilah-Resto/delilah-resto/uploads/134c4cd6-53d8-4b56-9d0e-a2ff0b461f51.png', precio: 40000 },
    { nombreProducto: 'Hamburguesa de aguacate', imagen: '/home/natalita/Escritorio/Proyecto Delilah-Resto/delilah-resto/uploads/134c4cd6-53d8-4b56-9d0e-a2ff0b461f51.png', precio: 50000 },
    { nombreProducto: 'Coca cola', imagen: '/home/natalita/Escritorio/Proyecto Delilah-Resto/delilah-resto/uploads/134c4cd6-53d8-4b56-9d0e-a2ff0b461f51.png', precio: 5000 },
    { nombreProducto: 'Agua', imagen: '/home/natalita/Escritorio/Proyecto Delilah-Resto/delilah-resto/uploads/134c4cd6-53d8-4b56-9d0e-a2ff0b461f51.png', precio: 3000 },
    { nombreProducto: 'Limonada de Mango', imagen: '/home/natalita/Escritorio/Proyecto Delilah-Resto/delilah-resto/uploads/134c4cd6-53d8-4b56-9d0e-a2ff0b461f51.png', precio: 9000 },
    { nombreProducto: 'Limonada', imagen: '/home/natalita/Escritorio/Proyecto Delilah-Resto/delilah-resto/uploads/134c4cd6-53d8-4b56-9d0e-a2ff0b461f51.png', precio: 5000 },
    { nombreProducto: 'Cafe', imagen: '/home/natalita/Escritorio/Proyecto Delilah-Resto/delilah-resto/uploads/134c4cd6-53d8-4b56-9d0e-a2ff0b461f51.png', precio: 8000 }
      
  ]);
    
  await Usuario.bulkCreate([

    { nombre: 'Natalia', apellido: "Camero", email:"nataliacameroc@gmail.com", telefono: "3013606833", direccioEnvio:"Calle 145 # 46 78", nombreUsuario: "nataliacameroc@gmail.com", password: "KJUBHYAS&&%TUGYGYJ", rol: "Administrador" },
    { nombre: 'Camilo', apellido: "Barrera", email:"camilobarrera@gmail.com", telefono: "3023445566", direccioEnvio:"Calle 1 # 56 99", nombreUsuario: "camilobarrera@gmail.com", password: "jg76ertwygbdsfy", rol: "usuarioBasico" },
    { nombre: 'Andres', apellido: "Ayala", email:"andresayala@gmail.com", telefono: "3036775477", direccioEnvio:"Carrera 45 # 8 67", nombreUsuario: "andresayala@gmail.com", password: "srfnw7ryiwhfjksdh", rol: "usuarioBasico" },
    { nombre: 'Gustavo', apellido: "Maggi", email:"gustavomaggi@gmail.com", telefono: "3057634387", direccioEnvio:"Calle 145 # 46 78", nombreUsuario: "gustavomaggi@gmail.com", password: "jhgf77tqwyxnfjd", rol: "usuarioBasico" },
  ])
};



module.exports.crearTablas = crearTablas;
module.exports.modelos = {
    Producto,
    Usuario,
    Pedido,
    Pedidos_Producto
  };
module.exports.roles = ROLES;
