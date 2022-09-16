// express
import express from 'express'
const app = express()

// instances
const port = 3000
const baseURL = "/nlw/api"

//import middlewares
import cors from 'cors'

//middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://127.0.0.1:5173/*'
}))

// routes
import AdsRouter from './router/AdsRouter'
import GamesRouter from './router/GamesRouter'

// run routes
app.use(baseURL, AdsRouter)
app.use(baseURL, GamesRouter)

// run server
app.listen(port, () => console.log('listening on port ' + port))