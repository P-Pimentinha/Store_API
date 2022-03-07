const mongoose = require('mongoose');
const {Sale, validate} = require('../models/sale'); 
const {Product} = require('../models/product'); 
const {Customer} = require('../models/customer');
const express = require('express');
const router = express.Router();




router.get('/', async (req, res) => {
    const sales = await Sale.find();
    res.send(sales);
  });

router.post('/', async (req, res) => {

    const { error } = (req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');
  
    const product = await Product.findById(req.body.itemId);
    if (!product) return res.status(400).send('Invalid product.');

    const amount = req.body.amount; 

    if (product.stock === 0 || (product.stock - amount) < 0 ) return res.status(400).send('Not Enough Stock.');
  
    let sale = new Sale({ 
      customer: { //Customer ID
        name: customer.name, 
      },
      item: { // movie ID
        item: product.item
      },
      amount: req.body.amount 
    });

    product.stock = await product.stock - sale.amount;

    sale = await sale.save();

    await product.save();

    res.send(sale); 
  
  });

router.get('/:id', async (req, res) => {
  const sale = await Sale.findById(req.params.id);

  if (!sale) return res.status(404).send('The sale with the given ID was not found.');

  res.send(sale);
});

  module.exports = router; 