const mongoose = require('mongoose');


const linkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true, trim: true }, // কাস্টম স্ল্যাগ ফিল্ড (ইউনিক ও অপশনাল)
  clicks: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);


const analyticsSchema = new mongoose.Schema({
  linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true },
  device: { type: String, default: 'Unknown' },
  browser: { type: String, default: 'Unknown' },
  os: { type: String, default: 'Unknown' },
  country: { type: String, default: 'Unknown' },
  city: { type: String, default: 'Unknown' },
  ip: { type: String },
}, { timestamps: true });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = { Link, Analytics };