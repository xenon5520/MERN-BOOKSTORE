import mongoose from "mongoose"
export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECT SUCCESSFULLY")
    } catch (error) {
        console.log("Error Connecting MONGODB", error)
        process.exit(1)
    }
}