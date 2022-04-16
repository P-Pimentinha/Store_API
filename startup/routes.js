const express = require('express');
const customers = require('../routes/customers'); 
const products = require('../routes/products'); 
const sales = require('../routes/sales'); 
const users = require ('../routes/users')


module.exports = function(app){
    app.use(express.json());

app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/sales', sales);
    }