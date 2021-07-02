const router = require("express").Router();
const withAuth = require("../../utils/with-auth");
const { User, Comment } = require("../../models");

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId);
    const comment = await Comment.findByPk(req.params.id);
    if (comment.UserId !== user.id) {
      return res.status(403).end();
    }
    await comment.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
