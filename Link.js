const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  clicks: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Link', LinkSchema);
