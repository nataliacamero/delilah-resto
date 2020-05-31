const jwt = require('jsonwebtoken')
const {firma} = require('./seguridad/config-seguridad')
// const informacionUsuario = { nombre : 'Delilah Resto'};
// const firma = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibm9tYnJlIjoiTWFyc2Rhc2RjZWxhIiwibm9tYnJlVXN1YXJpbyI6Im1hcmNlbHh2dmJ2Z2pmeGJjdmtrdm1uYnZjaGpra21qbmhidmN4Y3Zibm0sYWFjb2FzZGFzZHNkYXN0YUBnbWFpbC5jb20iLCJwYXNzd29yZCI6Im5sa2pzeHZramN4a25ueHZsa3hua2NibiBrY2Jsa25sY2tjYmxrIiwicm9sIjoidXN1YXJpb0Jhc2ljbyIsImlhdCI6MTU5MDkwMzI3MH0.G8p771GUUndf--LOjhMl4SSM3jfM2Zkn7-Uu5G7xFjI';


//Decodificar toquen
function checkToken(tokenAdecodificar) {
    const token = tokenAdecodificar.split(' ')[1];
    console.log("imprimiendo Token", token);
    const decodificado = jwt.verify(token, firma);
    console.log("decodificado", decodificado);
    return decodificado;
    
};

// Verificar rol
function authRole(role) {
    // console.log(req.headers.authorization);
    return (req, res, next) => {
      console.log(req.usuario.rol !== role)
      if (req.usuario.rol !== role) {
        res.status(401)
        return res.send('No es permitido el acceso a este recurso.')
      }
  
      next()
    }
}

module.exports.checkToken = checkToken;
module.exports.authRole = authRole;
    
