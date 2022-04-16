const express = require('express');
const admin = require('../middleware/admin');
const auth = require ('../middleware/auth');
const router = express.Router();
const { Product, validate, validateUpdate } = require('../models/product');

router.get('/', async (req, res) => {
    const product = await Product.find();
    res.send(product);
  });


router.post('/',auth, async (req,res) => {

const { error } = validate(req.body); 
if (error) return res.status(400).send(error.details[0].message);

let product = await Product.findOne({product_id: req.body.product_id});
if (product) return res.status(400).send('Product already registered!');

product = new Product({ 
    product_id: req.body.product_id,
    item: req.body.item,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock
  });

  await product.save();

  res.send(product);
});

router.put('/:id',auth, async (req, res) => {
  
  const { error } = validateUpdate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const productCheck = await Product.findOne({product_id: req.body.product_id});
  if (productCheck) return res.status(400).send('The given ID is already registered');

  let product = await Product.findByIdAndUpdate(req.params.id, { 
    product_id: req.body.product_id,
    item: req.body.item,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock }, {
    new: true
  });

  if (!product) return res.status(404).send('The product with the given ID was not found.');
  
  res.send(product);
});

router.delete('/:id',[auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) return res.status(404).send('The customer with the given ID was not found.');

  res.send(product);

});

router.get('/productID?:product_id', async (req, res) => {
  const product = await Product.find({product_id: req.query.product_id});

  if (!product) return res.status(404).send('The item with the given ID does not exist!');

  res.send(product);
}); 

module.exports = router;