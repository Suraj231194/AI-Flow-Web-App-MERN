const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Manual CORS Middleware as fallback
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use(cors());
app.use(express.json());

// Load routes
app.use('/api', require('./routes/ai'));
app.use('/api', require('./routes/save'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log('DB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
