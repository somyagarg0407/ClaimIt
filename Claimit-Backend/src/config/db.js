const mongoose =require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("MongoDB connection failed:");
        console.error(error.message);

        process.exit(1); // "If the database isn't available, stop the application instead of running in a broken state."
    }
};

modele.exports = connectDB;
    
