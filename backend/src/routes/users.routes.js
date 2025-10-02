import { Router } from "express";
import User from "../models/User.js";
// Importa as bibliotecas

const router = Router();

// Inserindo usuários no BD
// Deve funcionar apenas no cadastro
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao criar usuário", details: err.message });
  }
});

// Puxa apenas um usuário do BD
// Deve funcionar como validação no cadastro, para ver se já existe esse user
router.post("/check-email", async (req, res) => {
  const {email} = req.body;

  try {
    const user = await User.findOne({ email });
    if (user){
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch {
    res.status(500).send("Erro ao verificar e-mail");
  }
})

// Atualiza um usuário no BD
// Deve funcionar na página de login
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao atualizar", details: err.message });
  }
});

// Deleta um usuário no BD
// Deve funcionar na tela de login
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

export default router;
