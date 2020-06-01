const {checkToken} = require('../funciones');

//Metodo Seguro
const autenticarUsuario = (req, res, next) => {
 
    if (req.path === '/usuarios' && req.method !== 'GET') return next();
    if (  req.path === '/' || req.path === '/login' ) return next();
    
    console.log("Linea33",'pase aqui')
  
    if (!req.headers.authorization) { 
      res.status(401).json({ error: "No te has logeado"});
    } else {
  
      try{
        console.log("Linea16",'pase aqui')
        const verificarToken = checkToken(req.headers.authorization)
      
        if(verificarToken){
          req.usuario = verificarToken;
          return next();
        } else {
            res.status(400).json({error: "Credenciales invalidas" })
        }
  
      } catch(error) {
        res.status(401).json({ error: "Error al validar el usuario."});
      }
    }
};

module.exports.autenticarUsuario = autenticarUsuario;