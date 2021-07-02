const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/with-auth");

router.get("/", async (req, res) => {
  const loggedIn = req.session.loggedIn;
  const posts = await getAllPosts(req.session.userId);
  res.render("home", { posts, loggedIn });
});

router.get("/dashboard", withAuth, async (req, res) => {
  const loggedIn = req.session.loggedIn;
  const user = await User.findByPk(req.session.userId);
  const posts = await getUserPosts(user);
  res.render("dashboard", { posts, loggedIn });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("signup");
});

router.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;

async function getUserPosts(user) {
  const posts = (await user.getPosts()).map(post => post.dataValues);
  posts.forEach(post => (post.niceDate = getNiceDate(post)));
  return posts;
}

async function getAllPosts(userId) {
  const postRows = await Post.findAll();
  const posts = postRows.map(postRow => postRow.dataValues);
  const posters = await getPosters(postRows);
  const commentsArrays = await getCommentsArrays(postRows, userId);
  posts.forEach((post, i) => {
    post.username = posters[i].username;
    post.comments = commentsArrays[i];
    post.niceDate = getNiceDate(post);
  });
  return posts;
}

async function getPosters(postRows) {
  const posterRows = [];
  for (const postRow of postRows) {
    posterRows.push(await postRow.getUser());
  }
  const posters = posterRows.map(creatorRow => creatorRow.dataValues);
  return posters;
}

async function getCommentsArrays(postRows, userId) {
  const commentsArrayRows = [];
  for (const postRow of postRows) {
    commentsArrayRows.push(await postRow.getComments());
  }
  const commentsArrays = [];
  for (const commentsArrayRow of commentsArrayRows) {
    const commentArray = commentsArrayRow.map(
      commentArrayRow => commentArrayRow.dataValues
    );
    for (const comment of commentArray) {
      const commenter = await User.findByPk(comment.UserId);
      comment.username = commenter.username;
      comment.niceDate = getNiceDate(comment);
      if (commenter.id === userId) {
        comment.owned = true;
      }
    }
    commentsArrays.push(commentArray);
  }
  return commentsArrays;
}

function getNiceDate(row) {
  return row.updatedAt
    .toString()
    .split(" ")
    .filter((_word, index) => index < 4)
    .join(" ");
}
