const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MenuItem = mongoose.model("MenuItem", menuSchema);
const Order = mongoose.model("Order", orderSchema);

app.get("/api/menu", async (req, res) => {
  const menuItems = await MenuItem.find();
  res.json(menuItems);
});

app.post("/api/menu", async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.json(item);
});

app.post("/api/orders", async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});