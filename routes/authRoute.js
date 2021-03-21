const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// eslint-disable-next-line consistent-return
router.post("/register", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });

  // verifica se o email ja existe no banco de dados
  if (emailExist) return res.status(400).send("Email já existente.");

  // senha hash
  // funciona como se fosse um mesclado de strings aleatorias
  const salt = await bcrypt.genSalt(10);
  const hashedSenha = await bcrypt.hash(req.body.senha, salt);

  const user = new User({
    nome: req.body.nome,
    email: req.body.email,
    senha: hashedSenha,
    telefone: req.body.telefone,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// eslint-disable-next-line consistent-return
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Usuário e/ou senha inválidos");

  const senhaCorreta = await bcrypt.compare(req.body.senha, user.senha);
  if (!senhaCorreta)
    return res.status(400).send("Usuário e/ou senha inválidos");

  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "30m",
  });
  try {
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
