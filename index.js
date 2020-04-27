const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://xT9QqIg6HQ:XZQZ5BkP06@remotemysql.com:3306/xT9QqIg6HQ');

sequelize.authenticate().then(async () => {
    const query = 'SELECT * FROM usuarios';
    const [resultados] = await sequelize.query(query, { raw: true });

    console.log(resultados);
})

