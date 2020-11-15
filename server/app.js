//*REQUIREMENTS
require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let log = require('./controllers/logcontroller');
let user = require('./controllers/usercontroller');

//*SQLIZE
//sync all defined models to the database
sequelize.sync(); //({force: true}) to reset databases

//*MIDDLEWARE
app.use(express.json());

//*PATHS
app.use('/user', user);
app.use('/log', log);


//*LISTENING
app.listen(3000, () => {
    console.log('App is listening on port 3000.');
})