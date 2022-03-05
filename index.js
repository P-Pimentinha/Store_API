const express = require ('express');
const app = express();
const { connectDB } = require ('./startup/db');

//routes
const customers = require('./routes/customers'); 

//Express Middleware 
app.use(express.json());
//DataBase connection
connectDB();

app.use('/api/customers', customers);
require('./startup/prod')(app);





//Server Connection
const port = process.env.PORT || 8000;
app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})