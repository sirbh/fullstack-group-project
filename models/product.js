const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.trim().length > 0; // Ensure name is not an empty string
      },
      message: 'Name cannot be an empty string',
    },
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value > 0; // Ensure price is greater than zero
      },
      message: 'Price must be greater than zero',
    },
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

productSchema.set('toJSON', { virtuals: false, versionKey: false });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;