import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filePath = path.join(__dirname, "./data.json")
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"))

app.get("/", (req, res) => {
    res.send("API Criativuz Suplementos rodando 🚀")
})

app.get("/api/all", (req, res) => {
    res.json(data.all)
})

export default app