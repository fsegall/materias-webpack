import React, { Component } from 'react'
import { Button } from './styles'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { bindActions } from '../utils'
import store from '../../redux/store'

class BotaoToConnect extends Component {
  handleClick = (transicao, acao) => e => {
    const colunaOrigem = this.props.colunas.materias[this.props.coluna].data

    const item = colunaOrigem.filter(item => item.uid === this.props.uid)

    if (transicao === 'arquivado') {
      if (
        !window.confirm(
          `Você tem certeza que deseja arquivar a matéria de título: ${
            item[0].titulo
          }?`
        )
      ) {
        return
      }
    }

    if (transicao === 'publicado') {
      if (
        !window.confirm(
          `Você tem certeza que deseja publicar a matéria de título: ${
            item[0].titulo
          }?`
        )
      ) {
        return
      }
    }

    if (acao === 'WebPush') {
      if (
        !window.confirm(
          `Você tem certeza que deseja mandar um push da matéria de título: ${
            item[0].titulo
          }?`
        )
      ) {
        return
      } else {
        this.props.actions.enviaPush(this.props.uid)
        return
      }
    }

    item[0].coluna = this.props.transicao

    this.props.actions.moverMateriaDeColuna(this.props.colunas.selected, {
      de: this.props.coluna,
      para: this.props.transicao,
      tipo: item[0].tipo,
      authenticator: store.getState().authenticator
    })
  }

  render () {
    return (
      <Button
        onClick={this.handleClick(this.props.transicao, this.props.acao)}
        transicao={this.props.transicao}
        acao={this.props.acao}
      >
        {this.props.transicao ? this.props.transicao : this.props.acao}
      </Button>
    )
  }
}

const mapStateToProps = state => {
  return {
    colunas: state
  }
}

// Componente "high order" que conecta o componente App à store do Redux com as funções de state e actions
const Botao = connect(
  mapStateToProps,
  bindActions(actions)
)(BotaoToConnect)

export default Botao
