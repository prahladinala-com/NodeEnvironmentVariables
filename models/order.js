const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

// Defining multiple Schema in one file( We can even define in a new file, but exploring a new way)
const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  name: String,
  count: Number,
  price: Number,
})

const ProductCart = mongoose.model('ProductCart', ProductCartSchema)

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)

// Exporting multiple schemas
module.exports = { Order, ProductCart }
