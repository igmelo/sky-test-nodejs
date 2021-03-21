const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    nome: String,
    email: String,
    senha: String,
    telefone: {
      numero: Number,
      ddd: Number,
    },
  },
  {
    timestamps: true, // Cria os campos createdAt e updatedAt
  }
);

module.exports = model("User", UserSchema);
