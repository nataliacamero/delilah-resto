const express = require('express');
const server = express();


//Servidor escuchando en puerto 3000
server.listen(3306, () => {
    console.log('Servidor iniciado...');
});