const jwt = require('jsonwebtoken')
const informacionUsuario = { nombre : 'Natalia'}
const firma = 'MateitoGusi123'

module.exports = { "verificarToken": verificarToken };

function verificarToken(tokenAdecodificar) {
    const token = tokenAdecodificar.split(' ')[1];
    console.log("imprimiendo Token", token);
    const decodificado = jwt.verify(token, firma);
    console.log("decodificado", decodificado);
    return decodificado;
    
};
    
