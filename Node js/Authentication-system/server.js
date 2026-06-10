import app from "./src/app.js";
import connectDB from "./src/config/database.js";

async function start() {
  try {
    await connectDB();
    const PORT = 5000;
    app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
}

start();