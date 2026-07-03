const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Link = require('./Link'); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;


mongoose.connect('mongodb+srv://public_student:LabUpdate2026@cluster0.y852dg8.mongodb.net/linkdrop?retryWrites=true&w=majority')
  .then(() => console.log('🎯 MongoDB Cloud Database Connected Successfully!'))
  .catch(err => console.error('❌ Database Connection Error:', err));


app.get('/api/links', async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/links', async (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) return res.status(400).json({ error: 'Please fill all fields' });

  try {
    const newLink = new Link({ title, url });
    await newLink.save();
    res.json(newLink); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
