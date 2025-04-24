const mongoose = require('mongoose');

// Suppress the deprecation warning
mongoose.set('strictQuery', false);

const MONGO_URI = 'mongodb://root:example@localhost:27017/sampledb?authSource=admin'; // Use the correct authSource
const DB_NAME = 'sampledb'; // Your target database

async function checkConnection() {
  try {
    // Mongoose connection
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Mongoose connected to the database:', DB_NAME);

    // Checking if connection is successful
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📂 Collections in "${DB_NAME}" database:`);
    collections.forEach((col) => {
      console.log(`- ${col.name}`);
    });

    // Close the connection
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

checkConnection();
