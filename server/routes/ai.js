const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/ask-ai', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    try {
        const { data } = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'mistralai/mistral-7b-instruct:free',
            messages: [{ role: 'user', content: prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:5173',
                'X-Title': 'AI Flow Builder',
            }
        });

        const completion = data.choices[0]?.message?.content;
        res.json({ response: completion });

    } catch (err) {
        console.error('AI Service Error:', err.response?.data || err.message);
        const msg = err.response?.data?.error?.message || 'Failed to fetch response';
        res.status(500).json({ error: msg });
    }
});

module.exports = router;
