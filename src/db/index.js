const mongoose = require("mongoose");
const config = require("../config");

const connectDB = async () => {
    try {
        const instance = await mongoose.connect(
            `${config.MONGODB_URI}?retryWrites=true&w=majority`
        );
        console.log(`MongoDB connected: ${instance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed.", error);
        process.exit(1);
    }
};

module.exports = connectDB;
