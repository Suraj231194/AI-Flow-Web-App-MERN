const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load routes
app.use('/api', require('./routes/ai'));
app.use('/api', require('./routes/save'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log('DB Connection Error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
