const jwt = require("jsonwebtoken");

// eslint-disable-next-line func-names
// eslint-disable-next-line consistent-return
module.exports = function (req, res, next) {
  const token = req.header("Bearer");
  if (!token) return res.status(401).send("Token inválido");

  try {
    const verificado = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verificado;
    next();
  } catch (err) {
    res.status(400).send("Não autorizado");
  }
};
