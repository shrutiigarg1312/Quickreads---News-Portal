const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Category = require("../models/category");

var categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images/categories");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var categoryStorage = multer({ storage: categoryStorage });

const newCategory = (req, res, next) => {
  var obj = {
    name: req.body.category_title,
    color: req.body.category_color,
    // description: req.body.category_desc,
    img: {
      data: fs.readFileSync(
        path.join(process.cwd() + "/src/images/categories/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  Category.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/categories");
    }
  });
};



module.exports = { newCategory, categoryStorage };
