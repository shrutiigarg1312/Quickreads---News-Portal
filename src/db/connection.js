const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/quickreadsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connection to mongodb successful!");
}).catch((error) => {
  console.log(error);
})
