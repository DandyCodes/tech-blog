const router = require("express").Router();
const withAuth = require("../../utils/with-auth");
const { User } = require("../../models");

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (existingUser) {
      return res.status(403).end();
    }
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = user.id;
      res.status(200).json(user);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const errorMessage = "Incorrect username or password. Please try again.";
    if (!user) {
      res.status(400).json({ errorMessage });
      return;
    }
    const validPassword = user.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ errorMessage });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = user.id;
      res.status(200).json({ user, message: "Login successful." });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", withAuth, (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;
