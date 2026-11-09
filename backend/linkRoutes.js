const express = require('express');
const router = express.Router();
const useragent = require('express-useragent');
const geoip = require('geoip-lite');
const { Link, Analytics } = require('./Link'); 
const auth = require('../middleware/auth'); 


router.post('/', auth, async (req, res) => {
    try {
        const { title, url, slug } = req.body;
        
        const userId = req.user ? req.user.id : req.body.userId;

        if (slug && slug.trim() !== '') {
            const existingSlug = await Link.findOne({ slug: slug.trim() });
            if (existingSlug) {
                return res.status(400).json({ error: 'This custom URL is already taken.' });
            }
        }

        const newLink = new Link({
            title,
            url,
            slug: slug && slug.trim() !== '' ? slug.trim() : undefined,
            user: userId
        });

        await newLink.save();
        return res.status(201).json(newLink);
    } catch (err) {
        console.error('Create link error:', err);
        return res.status(500).json({ error: 'Server error: ' + err.message });
    }
});


router.get('/click/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;

        const query = identifier.match(/^[0-9a-fA-F]{24}$/) 
            ? { _id: identifier } 
            : { slug: identifier };

        const link = await Link.findOneAndUpdate(
            query,
            { $inc: { clicks: 1 } }, 
            { new: true }
        );

        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        
        try {
            const source = req.headers['user-agent'];
            const ua = useragent.parse(source);
            
            let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            if (ip && ip.includes(',')) {
                ip = ip.split(',')[0].trim();
            }
            
            const geo = geoip.lookup(ip);

            await Analytics.create({
                linkId: link._id,
                device: ua.isMobile ? 'Mobile' : ua.isTablet ? 'Tablet' : 'Desktop',
                browser: ua.browser || 'Unknown',
                os: ua.os || 'Unknown',
                country: geo ? geo.country : 'Unknown',
                city: geo ? geo.city : 'Unknown',
                ip: ip
            });
        } catch (trackingErr) {
            console.error('Analytics tracking error:', trackingErr);
        }

        return res.redirect(link.url);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});


router.get('/analytics/:linkId', async (req, res) => {
    try {
        const { linkId } = req.params;
        
        const analyticsData = await Analytics.find({ linkId }).sort({ createdAt: -1 });
        return res.status(200).json(analyticsData);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;