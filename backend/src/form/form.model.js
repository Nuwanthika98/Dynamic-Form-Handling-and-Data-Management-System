const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        suburb: {
            type: String,
        },
        postalcode: {
            type: String,
            required: true
        },
        deliverycost: {
            type: String,
            required: true
        },
        pickupcost: {
            type: String,
        }
    }
)

const model = mongoose.model('form', schema)
module.exports = model