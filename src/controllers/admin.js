const Admin = require("../models/admin");
const Category = require("../models/category");
const Article = require("../models/article");
const User = require("../models/user");

//Function for admin login
const adminLogin = (req, res) => {
  const adminEmail = req.body.login_email;
  const adminPassword = req.body.login_password;

  Admin.findOne({ email: adminEmail }, (err, foundadmin) => {
    if (!foundadmin) {
      loginMessage = "Incorrect Email";
      res.render("./admin/login", { loginErr: loginMessage });
    } else if (foundadmin.password != adminPassword) {
      loginMessage = "Incorrect password!";
      res.render("./admin/login", { loginErr: loginMessage });
    } else {
      session = req.session;
      session.admin = foundadmin;
      res.redirect("/admin/");
    }
  });
};

//Getting all categories
const getAllCategories = (req, res) => {
  Category.find({}, (err, foundCategories) => {
    res.render("admin/categories", { categories: foundCategories });
  }).sort({ name: 1 });
};

// Getting all articles
const getAllArticles = (req, res) => {
  Article.find({}, (err, foundArticles) => {
    res.render("admin/articles", { articles: foundArticles });
  }).sort({ date: -1 });
};

//Getting details for dashboard
const getAdminDetails = (req, res) => {
  Article.find({}, (err, foundAllArticles) => {
    Article.find({}, (err, foundArticles) => {
      Category.find({}, (err, foundCategories) => {
        User.find({}, (err, foundUsers) => {
          res.render("admin/index", {
            articles: foundArticles,
            count_article: foundAllArticles.length,
            count_category: foundCategories.length,
            count_user: foundUsers.length,
          });
        });
      });
    }).limit(4);
  });
};

//Make articles trending
const makeTrending = (req, res) => {
  const article = JSON.parse(req.body.add_trend);
  Article.findOneAndUpdate(
    { _id: article._id },
    { trend: true },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something went wrong when updating data!");
      }
    }
  );
  res.redirect("/admin/articles");
};

//Remove articles trending
const removeTrending = (req, res) => {
  const article = JSON.parse(req.body.remove_trend);
  Article.findOneAndUpdate(
    { _id: article._id },
    { trend: false },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something went wrong when updating data!");
      }
    }
  );
  res.redirect("/admin/articles");
};

const deleteArticle = (req, res) => {
  const article = JSON.parse(req.body.delete_article);
  Article.findOneAndDelete({ _id: article._id }, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/admin/articles");
};

module.exports = {
  adminLogin,
  getAllCategories,
  getAllArticles,
  getAdminDetails,
  makeTrending,
  removeTrending,
  deleteArticle,
};
