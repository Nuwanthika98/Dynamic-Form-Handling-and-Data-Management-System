const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    city: {
      type: String,
      required: true,
    },
    suburb: {
      type: String,
    },
    postalcode: {
      type: String,
      required: true,
    },
  });

const schema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
      },
      addresses: {
        type: [addressSchema],
        required: true,
        validate: [arrayLimit, 'At least one address is required.'],
      },
      deliverycost: {
        type: String,
        required: true,
      },
      pickupcost: {
        type: String,
      },
})

function arrayLimit(val) {
    return val.length > 0;
  }
  
const model = mongoose.model('form', schema)
module.exports = model