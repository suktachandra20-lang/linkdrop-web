const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const useragent = require('express-useragent'); 
const geoip = require('geoip-lite'); 
require('dotenv').config();

const { Link, Analytics } = require('./Link');
const User = require('./User');
const authRoutes = require('./auth');
const authMiddleware = require('./authMiddleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(useragent.express()); 

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  family: 4,
  serverSelectionTimeoutMS: 10000
})
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.log('Database Connection Error:', err));

// Auth Routes
app.use('/api/auth', authRoutes);

app.get('/api/users/count', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Link Routes
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
    const { title, url, slug } = req.body;
    
    if (slug) {
      const existingSlug = await Link.findOne({ slug: slug.trim() });
      if (existingSlug) {
        return res.status(400).json({ error: 'This custom URL is already taken. Please try another.' });
      }
    }

    const newLink = new Link({
      title,
      url,
      slug: slug ? slug.trim() : undefined,
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


app.get('/api/click/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;

    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: identifier } : { slug: identifier };

    const link = await Link.findOneAndUpdate(
      query,
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (!link) return res.status(404).send('Link not found');
    
    try {
      const uaString = req.headers['user-agent'] || '';
      
      let browser = 'Unknown';
      if (uaString.includes('Chrome')) browser = 'Chrome';
      else if (uaString.includes('Firefox')) browser = 'Firefox';
      else if (uaString.includes('Safari')) browser = 'Safari';
      else if (uaString.includes('Edge')) browser = 'Edge';

      let os = 'Unknown';
      if (uaString.includes('Windows')) os = 'Windows';
      else if (uaString.includes('Mac')) os = 'MacOS';
      else if (uaString.includes('Linux')) os = 'Linux';
      else if (uaString.includes('Android')) os = 'Android';
      else if (uaString.includes('iPhone') || uaString.includes('iPad')) os = 'iOS';

      let device = 'Desktop';
      if (/Mobi|Android/i.test(uaString)) device = 'Mobile';
      else if (/Tablet|iPad/i.test(uaString)) device = 'Tablet';
      
      let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      if (ip && ip.includes(',')) {
        ip = ip.split(',')[0].trim();
      }
      
      const geo = geoip.lookup(ip);

      await Analytics.create({
        linkId: link._id,
        device: device,
        browser: browser,
        os: os,
        country: geo ? geo.country : 'Unknown',
        city: geo ? geo.city : 'Unknown',
        ip: ip
      });
    } catch (trackingErr) {
      console.error('Analytics tracking error:', trackingErr);
    }
    
    res.redirect(link.url);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const links = await Link.find({ user: user._id });
    res.json({ user, links });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics Route
app.get('/api/analytics/:linkId', authMiddleware, async (req, res) => {
  try {
    const { linkId } = req.params;
    
    const queryFilter = {
      $or: [
        { linkId: linkId },
        ...(linkId.match(/^[0-9a-fA-F]{24}$/) ? [{ linkId: new mongoose.Types.ObjectId(linkId) }] : [])
      ]
    };

    const analyticsData = await Analytics.find(queryFilter).sort({ createdAt: -1 });
    res.json(analyticsData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;