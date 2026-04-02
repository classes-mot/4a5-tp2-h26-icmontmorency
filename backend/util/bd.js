import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) return;
        
    let uri = "mongodb://localhost:27017/Tp02";

    try {
        await mongoose.connect(uri);
        isConnected = true;
        console.log("yippyyyy")
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}