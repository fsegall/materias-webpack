import {
  SELECIONA,
  AUTHENTICATOR,
  RECEBEMATERIAS,
  LOADINGREQUISICAO,
  SUCESSOREQUISICAO,
  ERROSREQUISICAO,
  FAZPUSH
} from '../constants'

import { combineReducers } from 'redux'

// Define um formato para o state inicial para não dar undefined no map para criar as colunas antes da resposta do Ajax

const stateInicialMaterias = {
  loading: {
    data: [{ title: 'Teste', transitions: ['botao'] }],
    conteudos: [{ ok: 1 }]
  },
  arquivado: {
    data: [{ title: 'Teste', transitions: ['botao'] }],
    conteudos: [{ ok: 1 }]
  },
  horaDeAtualizacao: new Date()
}

const stateInicialRequisicao = { status: '', uid: '', msg: '' }

const materias = (state = stateInicialMaterias, action) => {
  switch (action.type) {
    case RECEBEMATERIAS:
      return {
        ...action.payload.materias,
        horaDeAtualizacao: new Date()
      }
    default:
      return state
  }
}

const authenticator = (state = '123456', action) => {
  switch (action.type) {
    case AUTHENTICATOR:
      if (action.payload.token) {
        return action.payload.token
      } else {
        return null
      }
    default:
      return state
  }
}

const requisicao = (state = stateInicialRequisicao, action) => {
  switch (action.type) {
    case LOADINGREQUISICAO:
    case SUCESSOREQUISICAO:
    case ERROSREQUISICAO:
    case FAZPUSH:
      return {
        ...action.payload
      }
    default:
      return state
  }
}

const selected = (state = '', action) => {
  switch (action.type) {
    case SELECIONA:
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  materias,
  requisicao,
  selected,
  authenticator
})

export default rootReducer
