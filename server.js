const express = require("express");
require("dotenv").config();
// create express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express app is running! Yay");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});