const router = require("express").Router();
const { User, Post } = require("../../models");

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
