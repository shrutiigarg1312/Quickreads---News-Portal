const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    category:{
        type: String,
        required: true
    }, 
    author: {
        type:String,
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
    trend: {
        type:Boolean
    },
    active: {
        type:Boolean
    }
  });
  
  /* Article Model*/
  const Article = mongoose.model("Article", articleSchema);
  
  module.exports = Article;

