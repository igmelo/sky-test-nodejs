const router = require("express").Router();
const User = require("../models/user");
const verify = require("./verifyToken");

router.get("/", verify, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: "mensagem de erro" });
  }
});

router.get("/:_id", verify, async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findById(req.params._id);
    res.json(user);
  } catch (err) {
    res.json({ message: "mensagem de erro" });
  }
});

module.exports = router;
