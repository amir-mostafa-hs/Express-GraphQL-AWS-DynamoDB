const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = 5050;
app.listen(PORT, () => console.log("Server is running on port:", PORT));
