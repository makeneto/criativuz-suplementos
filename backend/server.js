import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const filePath = path.join(process.cwd(), "./data.json")
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"))

app.get("/", (req, res) => {
    res.send("API Criativuz Suplementos rodando 🚀")
})

app.get("/api/all", (req, res) => {
    res.json(data.all)
})

export default app