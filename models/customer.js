const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type:String,
        minlength: 2,
        maxlength: 50
    },
    phone: {
        type:String,
        minlength: 2,
        maxlength: 50
    }
});

const Customer = mongoose.model('Customers', customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      email: Joi.string().email().min(2).max(50),
      phone: Joi.string().min(2).max(50),
    });
    
    
    return schema.validate(customer);
  }

  function validateUpdateCustomer(upCustomer) {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50),
      email: Joi.string().email().min(2).max(50),
      phone: Joi.string().min(2).max(50),
    });
    
    return schema.validate(upCustomer);
  }

  
  exports.Customer = Customer;
  exports.validate = validateCustomer;
  exports.validateUpdate = validateUpdateCustomer;
  exports.customerSchema = customerSchema;