import { Router } from "express";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import { config } from "dotenv";
config();

const router = Router();
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(googleClientId);

router.post("/auth/google", async (req, res) => {
  const { idToken } = req.body;

  try {
    if(!idToken) return res.status(400).json({ error: "Token não enviado" })
    
    const ticket = await client.verifyIdToken({
      idToken,
      audience: googleClientId
    })

    const payload = ticket.getPayload();
    

    res.json({
      name: payload.name,
      email: payload.email,
      google_id: payload.sub
    })
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token inválido' });
  }
})

// Inserindo usuários no BD
// Deve funcionar apenas no cadastro
router.post("/", async (req, res) => {
  const { name, email, pass } = req.body; 
  try {
    const user = await User.create({name, email, pass});
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao criar usuário", details: err.message });
  }
});

// Puxa apenas um usuário do BD
// Deve funcionar como validação no cadastro, para ver se já existe esse user
router.post("/check-user", async (req, res) => {
  const {email, pass} = req.body;

  try {
    const user = await User.findOne({ email });
    if (pass == user.pass){
      return res.json({ exists: true, name: user.name });
    } else {
      return res.json({ exists: false });
    }
  } catch {
    res.status(500).send("Erro ao verificar usuário");
  }
})

export default router;
