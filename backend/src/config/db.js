import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect(`mongodb+srv://vkugatheesan:theesan123@cluster0.3ghphly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1); // exit with failure
  }
};
