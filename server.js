const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/dist/moveo-project"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/moveo-project/index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening");
});
