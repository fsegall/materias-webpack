const mongoose = require('mongoose')

const { Schema, model } = mongoose

const materiaSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  revisado: Boolean,
  conteudo: {
    type: String,
    required: true
  },
  transitions: {
    type: [String],
    required: true
  },
  data: Date,
  locked: Boolean,
  tipo: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  imagens_materia: String,
  na_home: String,
  icone: String,
  coluna: {
    type: String,
    required: true
  },
  dataBusca: Date,
  titulo: {
    type: String,
    required: true
  }
})

const Materia = model('Materia', materiaSchema)

module.exports = Materia
