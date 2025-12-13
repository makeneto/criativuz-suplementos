// dev.js
import app from "./server.js"

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}/api/all`)
})
