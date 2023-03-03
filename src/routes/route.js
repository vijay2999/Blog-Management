
const authorController = require("../Controllers/authorController");
const blogController = require("../Controllers/blogController");
const MW = require("../Middlewares/auth");
const express = require("express")
const router = express.Router();


router.post('/authors', authorController.createAuthor);

router.post("/login", authorController.loginAuthor);

router.post('/blogs', MW.authenticate, blogController.createBlog);

router.put("/blogs/:blogId", MW.authenticate, MW.authorise, blogController.updateBlog);

router.get('/blogs', MW.authenticate, blogController.getBlog);

router.delete("/blogs/:blogId", MW.authenticate, MW.authorise, blogController.deleteBlogByPathParam);

router.delete("/blogs",MW.authenticate, blogController.deleteByQuery);





router.all("/*", function (req, res) {
    try{
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
}catch(err){res.send(err.message)}
})


module.exports = router;