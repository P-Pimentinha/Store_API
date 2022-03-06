const express = require('express');
const router = express.Router();
const { Product, validate } = require('../models/product');

router.get('/', async (req, res) => {
    const product = await Product.find();
    res.send(product);
  });


router.post('/', async (req,res) => {

const { error } = validate(req.body); 
if (error) return res.status(400).send(error.details[0].message);

let product = await Product.findOne({product_id: req.body.product_id});
if (product) return res.status(400).send('Product already registered!');

product = new Product({ 
    product_id: req.body.product_id,
    item: req.body.item,
    price: req.body.price,
    description: req.body.description
  });

  await product.save();

  res.send(product);
});


  module.exports = router;