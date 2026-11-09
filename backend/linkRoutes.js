const useragent = require('express-useragent');
const geoip = require('geoip-lite');
const { Link, Analytics } = require('./Link'); 


router.post('/create', async (req, res) => {
    try {
        const { title, url, slug, userId } = req.body;
        
        if (slug) {
            const existingSlug = await Link.findOne({ slug });
            if (existingSlug) {
                return res.status(400).json({ error: 'This custom URL is already taken.' });
            }
        }

        const newLink = new Link({
            title,
            url,
            slug: slug || undefined, 
            user: userId
        });

        await newLink.save();
        res.status(201).json({ message: 'Link created successfully!', newLink });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
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

        // ট্র্যাকিং লজিক
        try {
            const source = req.headers['user-agent'];
            const ua = useragent.parse(source);
            
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
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
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/analytics/:linkId', async (req, res) => {
    try {
        const { linkId } = req.params;
        
        const analyticsData = await Analytics.find({ linkId }).sort({ createdAt: -1 });
        res.status(200).json(analyticsData);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});