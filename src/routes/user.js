const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// user signup
router.post("/user-signup", userController.newUser);

// user login
router.post("/user-login", userController.userLogin);

/* Getting the home page */
router.get("/", userController.getArticlesCategories);

/* Getting the categories page */
router.get("/categories", userController.getAllCategories);

router.post("/add-bookmark", userController.addBookmark);

router.post("/remove-bookmark", userController.removeBookmark);

/* View an article */
router.post("/viewArticle", (req, res) => {
  const article = JSON.parse(req.body.current_article);
  res.redirect("/article-get/" + article._id);
});

router.post("/viewBookmark", (req,res) =>{
  const article = JSON.parse(req.body.current_article);
  res.redirect("/article-get/" + article.article_id);
})

/*Getting the full article */
router.get("/article-get/:Articleid", userController.getFullArticle);

/* View articles in a category */
router.post("/articles", (req, res) => {
  const category = JSON.parse(req.body.current_category);
  res.redirect("/category-get/" + category._id);
});

/*Getting the articles based on category */
router.get("/articles", userController.getAllArticles);

/*Getting the articles based on category */
router.get("/category-get/:Categoryid", userController.getArticles);


/* Getting the bookmarks page */
router.get("/bookmarks", userController.getAllBookmarks)
/* Getting the user login page */
router.get("/user-login", (req, res) => {
  res.render("user-login", { loginErr: "" });
});

/* Getting the search page */
router.get("/search", (req, res) => {
  res.render("search");
});

/* User logout */
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
