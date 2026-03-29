const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// SEARCH
router.get('/search', async (req, res) => {
  const { name, category } = req.query;
  let filter = {};

  if (name) filter.name = { $regex: name, $options: 'i' };
  if (category) filter.category = category;

  const items = await MenuItem.find(filter).sort({ name: 1 });
  res.json(items);
});

module.exports = router;