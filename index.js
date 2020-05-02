const express = require('express');
const app = express();
const port = 3000;
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:Natalita@localhost:3306/Delilah_Resto');

app.get('/', (req, res) => {
    sequelize.authenticate().then(async () => {
        const query = 'SELECT * FROM usuarios';
        const [resultados] =  await sequelize.query(query, { raw: true })
        console.log(resultados);
        sequelize.close();
        res.json(resultados);
        
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
    }); 

       

});

app.listen(port, () => console.log(`notes-app listening on port ${port}!`));

