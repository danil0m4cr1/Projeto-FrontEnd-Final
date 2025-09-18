// Importa bibliotecas no formato CommonJS
const express = require("express")
const cors = require("cors")
const path = require("path")
const { OAuth2Client } = require('google-auth-library')

// Cria aplicação Express
const app = express()
const PORT = 3000
const id = '504391658440-8dslv576bkbs0ou2h9fiokpoveqk3ruo.apps.googleusercontent.com'
const client = new OAuth2Client(id)

// Middlewares
app.use(cors())          // Permite acesso de qualquer frontend
app.use(express.json())  // Permite receber JSON no body

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")))

// Rota raiz -> carrega index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Rota para autenticar com Google
app.post("/auth/google", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token não enviado" })

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: id
    })

    const payload = ticket.getPayload();

    // Retorna dados do usuário
    res.json({
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    })
  } catch (err) {
    res.status(401).json({ error: "Token inválido ou expirado" })
  }
})

// Inicia servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`)
})