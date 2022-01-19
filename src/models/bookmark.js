const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema({ 
    user_id: {
        type:String,
        required: true
    },
    article_id: {
        type:String,
        required: true
    },
    title: {
        type:String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    img:{
          data: Buffer,
          contentType: String
      },
    date: {
        type:Date,
        required: true
    },
});
  
  /* Bookmark Model*/
  const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
  
  module.exports = Bookmark;