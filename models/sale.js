const Joi = require('joi');
const mongoose = require('mongoose');

const Sale = mongoose.model('Sales', new mongoose.Schema({
    customer: {
        type:new mongoose.Schema({
            name: {
            type:String,
            required: true,
            minlength: 2,
            maxlength: 50
            }
        }),
        required: true
    },
    item: {
        type: new mongoose.Schema({
            item: {
                type:String,
                required: true,
                minlength: 2,
                maxlength: 50
            }
        }),
        required: true
    },
    date: { 
        type: Date, 
        required: true,
        default: Date.now
      },
    amount: {
        type: Number,
        required: true,
    }
}));

function validateSale(sale) {
    const schema = {
      customerId: Joi.string().required(),
      itemId: Joi.string().required(),
      amount: Joi.number().required()
    };
  
    return Joi.validate(sale, schema);
  } 

exports.Sale = Sale; 
exports.validate = validateSale;
