const express = require('express')
const router = new express.Router()

const Materia = require('../db/models/Materia')

router.post('/materias', async (req, res) => {
  const materia = new Materia(req.body)
  try {
    await materia.save()
    res.status(201).send(materia)
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

router.get('/materias', async (req, res) => {
  try {
    const materias = await Materia.find({})
    res.send(materias)
  } catch (e) {
    res.status(500).send() // Ou erros 400 de bad request ou Unauthorized
  }
  /*   Materia.find({})
    .then(materias => {
      res.status(200).send(materias)
    })
    .catch(e => {
      res.status(500).send(e)
    }) */
})

router.get('/materias/:uid', async (req, res) => {
  try {
    const materia = await Materia.findOne({ uid: req.params.uid })
    if (!materia) {
      return res.status(404).send()
    }
    res.status(200).send(materia)
  } catch (e) {
    res.status(500).send()
  }

  /*   Materia.findOne({ uid: req.params.uid })
    .then(materia => {
      if (!materia) {
        return res.status(404).send()
      }

      res.status(200).send(materia)
    })
    .catch(e => {
      res.status(500).send(e)
    }) */
})

router.put('/materias/:uid', async (req, res) => {
  const updates = Object.keys(req.body)

  const allowedUpdates = [
    // Nesse caso o usuário só poderia atualizar a propriedade coluna pela UI
    'autor',
    'revisado',
    'conteudo',
    'na_home',
    'coluna',
    'titulo',
    'dataBusca'
  ]

  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid operation.' })
  }

  /*   for (let update of updates) {
    if (!allowedUpdates.includes(update)) {
      return res.status(400).send({ error: 'Invalid operation.' })
    }
  } */

  try {
    const materia = await Materia.findOneAndUpdate(
      { uid: req.params.uid },
      req.body,
      { new: true, runValidators: true }
    )

    if (!materia) {
      return res.status(404).send() // Essa situação ocorreria caso outro usuário tivesse arquivado por exemplo
    }

    const novoPainel = await Materia.find({})

    console.log(novoPainel)
    res.send(novoPainel) // Retorna o painel todo atualizado para sincronizar o estado da aplicação no cliente com o do back-end
  } catch (e) {
    res.status(400).send() // Aqui poderia ser um 401 caso o usuário deixasse de ter permissão para fazer uma transição ou não estivesse logado.
  }
  /*   Materia.findOneAndUpdate({ uid: req.params.uid }, { locked: true })
    .then(materia => {
      if (!materia) {
        return res.status(404).send()
      }

      res.status(200).send(materia)
    })
    .catch(e => {
      res.status(500).send(e)
    }) */
})

router.delete('/materias/:uid', async (req, res) => {
  try {
    const materia = await Materia.findOneAndDelete({ uid: req.params.uid })
    if (!materia) {
      return res.status(404).send()
    }

    res.send(materia)
  } catch (e) {
    res.status(500).send(e)
  }
  /*   Materia.findOneAndDelete({ uid: req.params.uid })
    .then(materia => {
      if (!materia) {
        return res.status(404).send()
      }

      res.status(200).send(materia)
    })
    .catch(e => {
      res.status(500).send(e)
    }) */
})

module.exports = router
