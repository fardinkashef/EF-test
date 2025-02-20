import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB_URL");
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(
      process.env.MONGODB_URL,
      // Use the following db name to access local mongodb 👇:
      // {
      //   dbName: "fer-test-english-nextjs-version",
      // }

      // Use the following db name to access the project's mongodb on atlas 👇:
      {
        dbName: "eftest",
      }
    );

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
