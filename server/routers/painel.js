const express = require('express')
const Painel = require('../db/models/Painel')

const router = new express.Router()

router.post('/painel', async (req, res) => {
  const painel = new Painel(req.body)
  try {
    await painel.save()
    res.status(201).send(painel)
  } catch (e) {
    res.status(400).send(e)
  }
  // Sem async/await
  /*   materia
    .save()
    .then(materia => {
      res.status(201).send(materia)
    })
    .catch(e => {
      res.status(400).send(e)
    }) */
})

router.get('/painel', async (req, res) => {
  try {
    const painel = await Painel.find({})
    res.send(painel)
  } catch (e) {
    res.status(500).send()
  }
  /*   Materia.find({})
    .then(materias => {
      res.status(200).send(materias)
    })
    .catch(e => {
      res.status(500).send(e)
    }) */
})

module.exports = router
