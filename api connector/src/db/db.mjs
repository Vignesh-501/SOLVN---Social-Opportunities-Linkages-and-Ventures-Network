import mongoose from "mongoose";

async function connectToDatabase() {
    // investingApps
    // projectApps
      try {
        await mongoose.connect(`mongodb://localhost:27017/investingApps`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
      }
}

export { connectToDatabase, mongoose }