import dotenv from "dotenv";
import app from "./config/express.js";

// Load the variables in .env into process.env
dotenv.config({ quiet: true });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
