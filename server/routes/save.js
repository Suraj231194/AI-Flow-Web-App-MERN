const express = require('express');
const router = express.Router();
const Flow = require('../models/Flow');

router.post('/save', async (req, res) => {
    try {
        const { prompt, response } = req.body;
        if (!prompt || !response) return res.status(400).send('Missing data');

        const flow = await Flow.create({ prompt, response });
        res.status(201).json(flow);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error saving flow');
    }
});

module.exports = router;
