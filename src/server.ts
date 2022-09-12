// express
import express from 'express'
const app = express()
// instances
const port = 3000
const baseURL = "/nlw/api"
// routes
import AdsRouter from './router/AdsRouter.js'

app.use(baseURL, AdsRouter)

app.listen(port, () => console.log('listening on port ' + port))