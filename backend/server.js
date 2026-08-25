

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Link = require('./Link');
const authRoutes = require('./auth');
const authMiddleware = require('./authMiddleware');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.log('Database Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);

app.get('/api/links', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ user: req.user.id });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/links', authMiddleware, async (req, res) => {
  try {
    const { title, url } = req.body;
    const newLink = new Link({
      title,
      url,
      user: req.user.id
    });
    await newLink.save();
    res.json(newLink);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/links/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!link) {
      return res.status(404).json({ message: 'Link not found or unauthorized' });
    }
    res.json({ message: 'Link deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));