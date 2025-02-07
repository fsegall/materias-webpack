import {
  SELECIONA,
  AUTHENTICATOR,
  RECEBEMATERIAS,
  LOADINGREQUISICAO,
  SUCESSOREQUISICAO,
  ERROSREQUISICAO,
  FAZPUSH
} from '../constants/'

import axios from 'axios'

import { toast } from 'react-toastify'

import { atualizaPainel, enviaErroPainel } from './../../components/utils'

export function moverMateriaDeColuna (uidMateria, materias) {
  return async dispatch => {
    dispatch(loadingRequisicao(uidMateria))

    const formData = new window.FormData()

    formData.append('de', materias.de)
    formData.append('para', materias.para)
    formData.append('uid', uidMateria)
    formData.append('tipo', materias.tipo)
    formData.append('_authenticator', materias.authenticator)

    try {
      const response = await axios.post(`/noticias/api-painel/`, formData)

      if (
        response.data[0].mensagem !== '' &&
        response.data[0].mensagem !== undefined
      ) {
        toast.error(response.data[0].mensagem)
      }

      dispatch(sucessoRequisicao(uidMateria))
      dispatch(selecionaItemDeMateria(''))
      atualizaPainel(response, dispatch)
    } catch (error) {
      enviaErroPainel(error.message, dispatch, uidMateria)
    }
  }
}

export function enviaPush (uid) {
  return async dispatch => {
    dispatch(loadingRequisicao(''))
    const stringDePush = `?acao=webpush&uid=${uid}`
    try {
      const response = await axios.get(`/noticias/api-painel/${stringDePush}`)
      if (
        response.data[0].mensagem !== '' &&
        response.data[0].mensagem !== undefined
      ) {
        throw new Error(response.data[0].mensagem)
      }
      dispatch(fazPush(uid))
      dispatch(sucessoRequisicao(uid))
      atualizaPainel(response, dispatch)
    } catch (error) {
      enviaErroPainel(error, dispatch)
    }
  }
}

export function requisitaMaterias (dataRequisitada = '') {
  return async dispatch => {
    dispatch(loadingRequisicao(''))

    const dataParaFormatar = dataRequisitada ? new Date(dataRequisitada) : ''

    const dataFormatada = dataParaFormatar
      ? `${dataParaFormatar.getFullYear()}-${dataParaFormatar.getMonth() +
          1}-${dataParaFormatar.getDate()} 00\:00\:00`
      : ''

    const stringDeData = dataFormatada ? `?data=${dataFormatada}` : ''

    try {
      const response = await axios.get(`/noticias/api-painel/${stringDeData}`)
      dispatch(sucessoRequisicao(''))
      atualizaPainel(response, dispatch)
    } catch (error) {
      enviaErroPainel(error, dispatch)
    }
  }
}

export function recebeMaterias (materias) {
  return {
    type: RECEBEMATERIAS,
    payload: { materias }
  }
}

export function guardaToken (token) {
  return {
    type: AUTHENTICATOR,
    payload: { token }
  }
}

export function loadingRequisicao (id) {
  return {
    type: LOADINGREQUISICAO,
    payload: { status: 'loading', uid: id }
  }
}

export function sucessoRequisicao (id) {
  return {
    type: SUCESSOREQUISICAO,
    payload: { status: 'Sucesso', uid: id }
  }
}

export function errosRequisicao (error, id) {
  return {
    type: ERROSREQUISICAO,
    payload: { status: 'error', uid: id, msg: error }
  }
}

export function fazPush (id) {
  return {
    type: FAZPUSH,
    payload: { status: 'Push enviado!', uid: id }
  }
}

export function selecionaItemDeMateria (id) {
  return {
    type: SELECIONA,
    payload: id
  }
}
