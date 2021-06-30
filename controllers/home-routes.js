const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/with-auth");

router.get("/", async (req, res) => {
  const loggedIn = req.session.loggedIn;
  const posts = (await Post.findAll()).map(post => post.dataValues);
  res.render("home", { posts, loggedIn });
});

router.get("/dashboard", withAuth, async (req, res) => {
  const loggedIn = req.session.loggedIn;
  res.render("dashboard", { loggedIn });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("login");
});

router.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;
