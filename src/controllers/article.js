const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Article = require("../models/article");

var articleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images/articles");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var articleStorage = multer({ storage: articleStorage });

const newArticle = (req, res, next) => {
  var obj = {
    title: req.body.article_title,
    category: req.body.category_id,
    description: req.body.article_desc,
    author: req.session.author.name,
    date: new Date(Date.now()).toDateString(),
    trend: false,
    active: false,
    img: {
      data: fs.readFileSync(
        path.join(process.cwd() + "/src/images/articles/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  Article.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/author/articles");
    }
  });
};

module.exports = {
  newArticle,
  articleStorage
};
