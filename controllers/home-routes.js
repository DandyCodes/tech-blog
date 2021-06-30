const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/with-auth");

router.get("/", async (req, res) => {
  const loggedIn = req.session.loggedIn;
  const posts = (await Post.findAll()).map(post => post.dataValues);
  res.render("homepage", { posts, loggedIn });
});

module.exports = router;
