import express from 'express'
import dotenv from 'dotenv'
import todoRouter from './routes/todo.router.js'

dotenv.config()

const PORT = process.env.PORT || 3006

const app = express()

app.use(express.json())

app.use('/api/v1', todoRouter)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${ PORT }`)
})