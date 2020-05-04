function validarAutenticacion(user, password) {
    if (user === 'Natalia' && password === 'MateitoGusi123'){
      return true
    }
};

const db = [
      { nombre: 'Natalia', apellido: "Camero", email:"nataliacameroc@gmail.com", telefono: "3013606833", direccioEnvio:"Calle 145 # 46 78", password: "MateitoGusi123", rol: "Administrador" },
      { nombre: 'Camilo', apellido: "Barrera", email:"camilobarrera@gmail.com", telefono: "3023445566", direccioEnvio:"Calle 1 # 56 99", password: "jg76ertwygbdsfy", rol: "usuario" },
      { nombre: 'Andres', apellido: "Ayala", email:"andresayala@gmail.com", telefono: "3036775477", direccioEnvio:"Carrera 45 # 8 67", password: "srfnw7ryiwhfjksdh", rol: "usuario" },
      { nombre: 'Gustavo', apellido: "Maggi", email:"gustavomaggi@gmail.com", telefono: "3057634387", direccioEnvio:"Calle 145 # 46 78", password: "jhgf77tqwyxnfjd", rol: "usuario" }
];

function AuthenticatedUser(user, password) {
  console.log(`nombre: ${nombre} pass:${password}`);
  return db.filter(item => item.nombre == user[0] && item.password == password)[0];
}





module.exports = {validarAutenticacion, AuthenticatedUser};