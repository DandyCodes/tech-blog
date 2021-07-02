const router = require("express").Router();
const withAuth = require("../../utils/with-auth");
const { User, Post, Comment } = require("../../models");

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
    });
    const user = await User.findByPk(req.session.userId);
    await newPost.setUser(user);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
    });
    const post = await Post.findByPk(req.params.id);
    await newComment.setPost(post);
    const user = await User.findByPk(req.session.userId);
    await newComment.setUser(user);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId);
    const post = await Post.findByPk(req.params.id);
    if (post.UserId !== user.id) {
      return res.status(403).end();
    }
    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId);
    const post = await Post.findByPk(req.params.id);
    if (post.UserId !== user.id) {
      return res.status(403).end();
    }
    await post.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
