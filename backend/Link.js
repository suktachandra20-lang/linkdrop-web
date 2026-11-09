const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true, trim: true }, // কাস্টম স্ল্যাগ ফিল্ড (ইউনিক ও অপশনাল)
  clicks: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Link', linkSchema);