// express
import express from 'express'
const app = express()

// instances
const port = 3000
const baseURL = "/nlw/api"

// routes
import AdsRouter from './router/AdsRouter'

// run routes
app.use(baseURL, AdsRouter)

// run server
app.listen(port, () => console.log('listening on port ' + port))