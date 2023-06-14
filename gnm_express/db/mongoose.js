const mongoose = require('mongoose');
const dotenvConfig = require('dotenv').config();


mongoose.connect(dotenvConfig.parsed.MONGODB_URL, {});


