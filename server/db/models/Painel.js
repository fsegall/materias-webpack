const mongoose = require('mongoose')

const { Schema, model } = mongoose

const painelSchema = new Schema({
  states: {
    type: [String],
    required: true
  },
  conteudos: {
    type: [String],
    required: true
  }
})

const Painel = model('Painel', painelSchema)

module.exports = Painel
