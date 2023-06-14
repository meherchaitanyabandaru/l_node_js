const mongoose = require('mongoose');
const dotenvConfig = require('dotenv').config();

mongoose.set('strictQuery', true);
mongoose.connect(dotenvConfig.parsed.MONGODB_URL, {});


