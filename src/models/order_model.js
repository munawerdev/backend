import mongoose from "mongoose";
const previousOrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
},{
  timestamps: true
});

const orderSchema =new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
previousOrders: {
  type: [previousOrderSchema],
},
},{
  timestamps: true
});
export const Order =mongoose.model('Order',orderSchema);