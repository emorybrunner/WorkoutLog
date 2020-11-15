const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log', 'postgres', 'ThisIsAnOgre23', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    () => {
        console.log('Connected to workout-log database');
    },
    (err) => {
        console.log(err);
    }
);

module.exports = sequelize;