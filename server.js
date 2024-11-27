import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import todoRouter from './routes/todo.router.js'
import authRouter from './routes/auth.router.js'

dotenv.config()

const PORT = process.env.PORT || 3006

const app = express()

app.use(express.json())
app.use(morgan('combined'))

app.use('/api/v1', authRouter)
app.use('/api/v1', todoRouter)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${ PORT }`)
})