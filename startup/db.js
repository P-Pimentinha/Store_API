const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
    try{
        const db = config.get('db');
        await mongoose.connect(db);
        console.log('MongoDb connected!!');
    } catch(err) {
        console.log('Failed to connect to  MongoDB', err);
    }
}

exports.connectDB = connectDB;