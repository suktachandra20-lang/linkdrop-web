
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

        
        return res.redirect(link.url);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});