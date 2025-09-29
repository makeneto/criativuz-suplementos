import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Lê o arquivo JSON
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"))

// Rota inicial
app.get("/", (req, res) => {
    res.send("API Criativuz Suplementos rodando 🚀")
})

// Rota de produtos (puxando do data.json)
app.get("/api/products", (req, res) => {
    res.json(data.products)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`))
