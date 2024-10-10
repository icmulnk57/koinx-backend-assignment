const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cryptoRoutes = require("./routes/cryptoRoutes");
const startCryptoDataJob = require("./jobs/fetchCryptoData");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", cryptoRoutes);

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    startCryptoDataJob();
  })
  .catch((error) => {
    console.error("Failed to start the server:", error.message);
  });
