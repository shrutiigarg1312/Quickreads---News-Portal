const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author");
const articleController = require("../controllers/article");

//author signup
router.post("/signup", authorController.newAuthor);

//author login
router.post("/login", authorController.authorLogin);

/* Getting the author login page */
router.get("/login", (req, res) => {
  res.render("author-login", { loginErr: "" });
});

/* Getting the author home page */
router.get("/", authorController.getAuthorDetails)

/* Getting the author add article page */
router.get("/articles", authorController.getAuthorArticle);

/* Getting the author add article page */
router.get("/add-article", authorController.getAllCategories);

router.post(
  "/add-article",
  articleController.articleStorage.single("article_img"),
  articleController.newArticle
);

router.post("/delete-article", authorController.deleteArticle)

module.exports = router;
