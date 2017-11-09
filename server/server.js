import express from 'express'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 5050

app.use('/', express.static(path.join(__dirname, '/../dist')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname + '/../dist/index.html')))
})

app.listen(PORT)
console.log('Listening on port: ' + PORT + ' | http://localhost:' + PORT)