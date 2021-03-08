const express = require('express')
const router = require('./routes')
const error = require('./middlewares/errorHandler')
const app = express()
const PORT = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/v1', router)
app.use(error)

app.listen(PORT, () => {
  console.log('Listening on localhost:' + PORT)
})