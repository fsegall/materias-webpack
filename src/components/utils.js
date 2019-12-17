import { bindActionCreators } from 'redux'
import {
  guardaToken,
  recebeMaterias,
  selecionaItemDeMateria,
  errosRequisicao,
  requisitaMaterias
} from '../redux/actions'

export const bindActions = actions => dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

const conteudosPorState = (items, coluna) => {
  const objetivo = items
    .filter(item => item.coluna === coluna)
    .reduce((accum, item) => {
      accum[item.conteudo] = (accum[item.conteudo] || 0) + 1
      return accum
    }, {})
  return Object.keys(objetivo).map(key => ({ [key]: objetivo[key] }))
}

export const extrairColunasPorState = (items, states) => {
  const colunas = {}
  for (let coluna of states) {
    colunas[coluna] = {
      data: items.filter(item => item.coluna === coluna),
      conteudos: conteudosPorState(items, coluna)
    }
  }
  return colunas
}

export const atualizaPainel = (response, dispatch) => {
  const items = response.data[0].itens
  const states = response.data[0].states || [
    'privado',
    'pendente',
    'liberado',
    'publicado',
    'arquivado'
  ]
  const authenticator = response.data[0]._authenticator
  const gt = guardaToken(authenticator)
  dispatch(gt)
  dispatch(recebeMaterias(extrairColunasPorState(items, states)))
}

export const enviaErroPainel = (error, dispatch) => {
  console.log('error', error.message)
  console.error(error.message)
  dispatch(selecionaItemDeMateria(''))
  dispatch(errosRequisicao(error.message, ''))
  dispatch(requisitaMaterias())
}
