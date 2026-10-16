import dotenv from "dotenv";
import app from "./config/express.js";
import connectDB from "./config/db.js";

// Load the variables in .env into process.env
dotenv.config({ quiet: true });

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
