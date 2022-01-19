const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    color: {
        type:String,
        required: true
    },
    img:{
          data: Buffer,
          contentType: String
    },
    description:{
          data: String
    }    
  });
  
  /* Category Model*/
  const Category = mongoose.model("Category", categorySchema);
  
  module.exports = Category;