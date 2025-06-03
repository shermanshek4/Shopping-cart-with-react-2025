const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB error", err));

const Order = mongoose.model("Order", new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    address: String,
  },
  cart: Array,
  total: Number,
  createdAt: { type: Date, default: Date.now }
}));

app.get("/", (req, res) => res.send("Checkout API Live"));

app.post("/checkout", async (req, res) => {
  const { cart, customer, total } = req.body;

  if (!cart?.length || !customer?.name || !customer?.email || !customer?.address) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const order = new Order({ cart, customer, total });
    await order.save();
    return res.status(200).json({ message: "✅ Order saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server at http://localhost:${PORT}`));
