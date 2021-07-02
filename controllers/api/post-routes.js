const router = require("express").Router();
const { Post } = require("../../models");

router.put("/update/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
