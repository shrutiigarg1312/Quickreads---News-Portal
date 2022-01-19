const Author = require("../models/author");
const Category = require("../models/category");
const Article = require("../models/article");

//Function for creating an author
const newAuthor = (req, res) => {
  const authorName = req.body.signup_name;
  const authorEmail = req.body.signup_email;
  const authorPassword = req.body.signup_password;

  const author = new Author({
    name: authorName,
    email: authorEmail,
    password: authorPassword,
  });

  author.save();
  res.redirect("/author-login");
};

//Function for author login
const authorLogin = (req, res) => {
  const authorEmail = req.body.login_email;
  const authorPassword = req.body.login_password;

  Author.findOne({ email: authorEmail }, (err, foundauthor) => {
    if (!foundauthor) {
      loginMessage = "Author does not exists! Please signup first.";
      res.render("./author-login", { loginErr: loginMessage });
    } else if (foundauthor.password != authorPassword) {
      loginMessage = "Incorrect password!";
      res.render("./author-login", { loginErr: loginMessage });
    } else {
      session = req.session;
      session.author = foundauthor;
      res.redirect("/author");
    }
  });
};
const getAuthorArticle = (req, res) => {
  Article.find({ author: req.session.author.name }, (err, foundArticles) => {
    res.render("author/articles", { articles: foundArticles });
  });
};

const getAllCategories = (req, res) => {
  Category.find({}, (err, foundCategories) => {
    res.render("author/add-article", { categories: foundCategories });
  }).sort({ name: 1 });
};

const getAuthorDetails = (req, res) => {
  Article.find({ author: req.session.author.name }, (err, foundAllArticles) => {
    Article.find({ author: req.session.author.name }, (err, foundArticles) => {
      Article.distinct("category", { author: req.session.author.name })
        .count()
        .exec((err, count_category) => {
          Article.find({
            trend: true,
            author: req.session.author.name,
          })
            .count()
            .exec((err, count_trend) => {
              res.render("author/index", {
                articles: foundArticles,
                count_article: foundAllArticles.length,
                count_category: count_category,
                count_trending: count_trend,
              });
            });
        });
    }).limit(2);
  });
};

const deleteArticle = (req, res) => {
  const article = JSON.parse(req.body.delete_article);
  Article.findOneAndDelete({ _id: article._id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/author/articles");
    }
  });
};

module.exports = {
  newAuthor,
  authorLogin,
  getAuthorArticle,
  getAllCategories,
  getAuthorDetails,
  deleteArticle,
};
