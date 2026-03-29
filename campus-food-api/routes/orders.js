const express = require('express');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

async function calculateTotalPrice(items) {
  const ids = items.map(i => i.menuItem);
  const menuItems = await MenuItem.find({ _id: { $in: ids } });

  let total = 0;

  items.forEach(i => {
    const item = menuItems.find(m => m._id.toString() === i.menuItem);
    if (!item) throw new Error("Invalid MenuItem");
    total += item.price * i.quantity;
  });

  return total;
}

// CREATE ORDER
router.post('/', async (req, res) => {
  try {
    const { student, items } = req.body;

    if (!student || !items.length)
      return res.status(400).json({ error: "Invalid data" });

    const totalPrice = await calculateTotalPrice(items);

    const order = new Order({ student, items, totalPrice });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;