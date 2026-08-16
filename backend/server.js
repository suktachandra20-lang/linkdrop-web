const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Link = require('./Link'); 

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Local MongoDB Connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/linkdrop';

mongoose.connect(MONGO_URI)
  .then(() => console.log('🎯 Local MongoDB Database Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err.message));

// 1. Home Route
app.get('/', (req, res) => {
  res.send('Linkdrop Backend Server is Running!');
});

// 2. Get All Links
app.get('/api/links', async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Add New Link
app.post('/api/links', async (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const newLink = new Link({ title, url });
    await newLink.save();
    res.json(newLink); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- NEW ROUTES ADDED BELOW ----------------

// 4. Delete a Link
app.delete('/api/links/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Link.findByIdAndDelete(id);
    res.json({ message: 'Link deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Update/Edit a Link
app.put('/api/links/:id', async (req, res) => {
  const { title, url } = req.body;
  try {
    const updatedLink = await Link.findByIdAndUpdate(
      req.params.id,
      { title, url },
      { new: true }
    );
    res.json(updatedLink);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Increment Click Count (+1)
app.patch('/api/links/:id/click', async (req, res) => {
  try {
    const updatedLink = await Link.findByIdAndUpdate(
      req.params.id,
      { $inc: { clicks: 1 } }, // clicks ফিল্ড ১ বাড়িয়ে দেবে
      { new: true }
    );
    res.json(updatedLink);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------------

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));