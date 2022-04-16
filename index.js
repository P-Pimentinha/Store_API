const express = require ('express');
const config = require('config');
const app = express();
const { connectDB } = require ('./startup/db');

if(!config.get('jwtPrivateKey')) {
    console.error('Fatal Error:JWT is not defined.');
    process.exit(1);
}

connectDB();
require('./startup/routes')(app);
require('./startup/prod')(app);

const port = process.env.PORT || 8000;
app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})