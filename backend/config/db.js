const mongoose = require("mongoose");

const connectDb = async () => {
    let conn;

    try {
        await mongoose.connect("mongodb+srv://dr0458571:zzh6Y5mHRKRIqqxI@chakracoders.vfsqzg5.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
        conn = mongoose.connection;
        console.log(`MongoDB Connected: ${conn.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDb;
