const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming you have a User model)
    required: true
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model (assuming you have a Product model)
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;