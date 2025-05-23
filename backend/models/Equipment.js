/*/ backend/routes/equipment.js
router.get('/all', async (req, res) => {
  const equipment = await Equipment.find(); // Equipment is a MongoDB model
  res.json(equipment);
});*/
// backend/models/Equipment.js

const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  description: String,
  purchaseDate: Date,
  status: String,
});

module.exports = mongoose.model('Equipment', equipmentSchema);
