import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  }
})

const FarmerSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
})

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    type: Array,
    required: true
  },
  products: {
    type: [ProductSchema],
    required: true
  },
  classes: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    required: true
  },
  farmer: {
    type: FarmerSchema
  }
})

mongoose.models = {}

const Order = mongoose.model('Order', OrderSchema)

export default Order
