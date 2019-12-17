const fs = require('fs')
const express = require('express')
require('./db/mongoose')
const cors = require('cors')

const materiasRouter = require('./routers/materias')
const painelRouter = require('./routers/painel')

// Instanciate express
const app = express()

app.use(cors())
// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// Reference routers
app.use(materiasRouter)
app.use(painelRouter)

// Node default port or 3000
const Port = process.env.PORT || 3000

// Json para testes
const dataBuffer = fs.readFileSync('./data/data.json')

const data = JSON.parse(dataBuffer.toString())

app.get('/', (req, res) => res.json(data))

app.put('/', (req, res) => {
  // const { uid, de, para } = req.body

  /* const newItems = data.items.map(item => {
    if (item.uid === uid) {
      item.coluna = para
    }
    return item
  })

  const newState = { ...data, items: newItems }

  console.log('new', newState) */

  return setTimeout(() => res.json(req.body), 2000)
})

/* app.get('*', (req, res) =>
  res.status(404).send('This is a 404, no page found!')
) */

app.listen(Port, () => console.log(`Server running at port ${Port}`))
