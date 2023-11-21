
const mongoose = require("mongoose");

const connectDb = async () => {
    let conn;

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/taskify");
        conn = mongoose.connection;
        console.log(`MongoDB Connected: ${conn.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;
