const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);
    console.log(JSON.stringify(process.env.MONGO_URI));
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✓ MongoDB Connected");
    console.log(conn.connection.host);
  } catch (err) {
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;