const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: {
        type:String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    item: {
        type:String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    price: {
        type:mongoose.Types.Decimal128,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 250
    }
});

const Product = mongoose.model('Products', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
      product_id: Joi.string().min(2).max(50).required(),
      item: Joi.string().min(2).max(50).required(),
      price: Joi.number().precision(2).min(2).max(50).required(),
      description: Joi.string().min(2).max(50).required(),
    });
    
    
    return schema.validate(product);
  }

  function validateUpdateProduct(upProduct) {
    const schema = Joi.object({
      product_id: Joi.string().min(2).max(50),
      item: Joi.string().min(2).max(50),
      price: Joi.number().precision(2).min(2).max(50),
      description: Joi.string().min(2).max(50),
    });
    
    
    return schema.validate(upProduct);
  }

  exports.Product = Product;
  exports.validate = validateProduct;
  exports.validateUpdate = validateUpdateProduct;
  exports.customerSchema = productSchema;