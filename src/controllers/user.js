const User = require("../models/user");
const Category = require("../models/category");
const Article = require("../models/article");
const Bookmark = require("../models/bookmark");

//Function for creating a user
const newUser = (req, res) => {
  const userName = req.body.signup_name;
  const userEmail = req.body.signup_email;
  const userPassword = req.body.signup_password;

  const user = new User({
    name: userName,
    email: userEmail,
    password: userPassword,
  });

  user.save();
  res.redirect("/user-login");
};

//Function for user login
const userLogin = (req, res) => {
  const userEmail = req.body.login_email;
  const userPassword = req.body.login_password;

  User.findOne({ email: userEmail }, (err, founduser) => {
    if (!founduser) {
      loginMessage = "User does not exists! Please signup first.";
      res.render("./user-login", { loginErr: loginMessage });
    } else if (founduser.password != userPassword) {
      loginMessage = "Incorrect password!";
      res.render("./user-login", { loginErr: loginMessage });
    } else {
      session = req.session;
      session.user = founduser;
      res.redirect("/");
    }
  });
};

//Getting 5 categories and 5 articles for index page
const getArticlesCategories = (req, res) => {
  Article.find({}, (err, foundArticles) => {
    Category.find({}, (err, foundCategories) => {
      Article.findOne({ trend: true }, (err, foundTrending) => {
        res.render("index", {
          articles: foundArticles,
          categories: foundCategories,
          trending: foundTrending,
        });
      });
    }).limit(5);
  })
    .limit(5)
    .sort({ date: -1 });
};

//Getting categories for category page
const getAllCategories = (req, res) => {
  Category.find({}, (err, foundCategories) => {
    res.render("categories", { categories: foundCategories });
  }).sort({ name: 1 });
};

//Getting all articles for category page
const getAllArticles = (req, res) => {
  Article.find({}, (err, foundArticles) => {
    res.render("articles", {
      articles: foundArticles,
      category: null,
    });
  }).sort({ date: -1 });
};

//Getting full-article
const getFullArticle = (req, res) => {
  const articleid = req.params.Articleid;
  Article.findOne({ _id: articleid }, (err, foundArticle) => {
    Category.findOne({ name: foundArticle.category }, (err, foundCategory) => {
      Article.find(
        { trend: true, _id: { $ne: articleid } },
        (err, foundTrending) => {
          if (req.session.user != null) {
            Bookmark.findOne(
              { article_id: foundArticle._id, user_id: req.session.user._id },
              (err, foundBookmark) => {
                res.render("full-article", {
                  article: foundArticle,
                  color: foundCategory.color,
                  trending: foundTrending,
                  bookmark: foundBookmark,
                });
              }
            );
          } else {
            res.render("full-article", {
              article: foundArticle,
              color: foundCategory.color,
              trending: foundTrending,
              bookmark: null,
            });
          }
        }
      ).limit(2);
    });
  });
};

//Getting articles based on category
const getArticles = (req, res) => {
  const categoryid = req.params.Categoryid;
  Category.findOne({ _id: categoryid }, (err, foundCategory) => {
    Article.find({ category: foundCategory.name }, (err, foundArticles) => {
      res.render("articles", {
        articles: foundArticles,
        category: foundCategory,
      });
    });
  });
};

//Adding a bookmark
const addBookmark = (req, res) => {
  const article = JSON.parse(req.body.current_article);
  const user = req.session.user;
  Bookmark.findOne({user_id:user._id, article_id:article._id},(err,foundBookmark)=>{
    if(foundBookmark==null){
      const bookamark = new Bookmark({
        user_id: user._id,
        article_id: article._id,
        title: article.title,
        category: article.category,
        description: article.description,
        img: article.img,
        date: article.date,
      });    
      bookamark.save();
    }
  })  
  res.redirect("/bookmarks");
};

const removeBookmark = (req, res) => {
  const article = JSON.parse(req.body.current_article);
  Bookmark.findOneAndDelete(
    { user_id: req.session.user._id, article_id: article},
    (err, docs) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.redirect("/bookmarks");
};

//Getting boookmarks
const getAllBookmarks = (req, res) => {
  Bookmark.find({}, (err, foundBookmarks) => {
    res.render("bookmarks", { bookmarks: foundBookmarks });
  });
};

module.exports = {
  newUser,
  userLogin,
  getArticlesCategories,
  getAllCategories,
  getFullArticle,
  getArticles,
  getAllArticles,
  addBookmark,
  removeBookmark,
  getAllBookmarks,
};
