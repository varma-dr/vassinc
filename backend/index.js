import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db.js'
import candidateModel from './models/candidate.js'

dotenv.config()

// mongodb+srv://varmadr16:<db_password>@vassinc.mu3zc.mongodb.net/?retryWrites=true&w=majority&appName=vassinc

const app = express()
app.use(express.json())

connectDB()

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 5501


app.get('/', (req, res) => {
    const response = awaitcandidateModel.find()
    return res.json({candidates : response})
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
