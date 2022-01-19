const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const categoryController = require("../controllers/category");


/* Getting the admin login page */
router.get("/login", (req, res) => {
  res.render("admin/login", { loginErr: "" });
});

//admin login
router.post("/login", adminController.adminLogin);

/* Getting the admin home page */
router.get("/", adminController.getAdminDetails);

/* Getting the admin articles page */
router.get("/articles", adminController.getAllArticles)

/* Getting the admin categories page */
router.get("/categories", adminController.getAllCategories);

/* Getting the admin add category page */
router.get("/add-category", (req, res) => {
  res.render("admin/add-category");
});

/*Adding a new category */
router.post(
  "/add-category",
  categoryController.categoryStorage.single("category_img"),
  categoryController.newCategory
);

//Making an article trending
router.post("/make-trending", adminController.makeTrending)

//Removing an article from trending
router.post("/remove-trending", adminController.removeTrending)

//Delete an article 
router.post("/delete-article", adminController.deleteArticle)

//Admin logout
router.get("/logout", (req,res)=>{
  req.session.destroy();
  res.redirect("../");
})

module.exports = router;
