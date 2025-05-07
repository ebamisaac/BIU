require('dotenv').config();

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/after-school-learning',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-here'
};