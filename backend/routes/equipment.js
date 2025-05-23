/*// routes/equipment.js

const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");

// ✅ POST - Create new record
router.post("/", async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json(equipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ GET - Get all records
router.get("/", async (req, res) => {
  try {
    const equipmentList = await Equipment.find();
    res.json(equipmentList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET - Search by Serial Number
router.get("/search/:serial", async (req, res) => {
  try {
    const item = await Equipment.findOne({ serialNumber: req.params.serial });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT - Update equipment
router.put("/:id", async (req, res) => {
  try {
    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE - Delete equipment
router.delete("/:id", async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;*/

const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// Get all equipment
router.get('/', async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new equipment
router.post('/', async (req, res) => {
  const { itemName, serialNumber, purchaseDate, status } = req.body;
  const newEquipment = new Equipment({ itemName, serialNumber, purchaseDate, status });
  try {
    const saved = await newEquipment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

