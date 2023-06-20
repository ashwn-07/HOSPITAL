const express = require("express");
const app = new express();

const api = require("./routes/hospital");
app.use("/dbop", api);



app.listen(5004, () => {
  console.log("server started sucessfuly");
});
