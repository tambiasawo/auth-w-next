import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGOOSE_DB_CONNECT
    );
    if (connection.readyState === 1) return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default connectDB;
