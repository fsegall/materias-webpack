import React, { Component } from 'react'
import {
  EstiloLista,
  Topo,
  BadgeData,
  Icone,
  Titulo,
  Autor,
  BotoesContainer,
  BotoesLista,
  Spinner,
  Label,
  Drop,
  Tip
} from './styles'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import MaisConteudo from '../MaisConteudo'
import Botao from '../Botao'
import store from '../../redux/store'
import { bindActions } from '../utils'
import ToolTip from '../toolTip'
// import '../scss/app.scss'

class ItemMateriaToConnect extends Component {
  state = {
    selected: this.props.materiaPorColuna.uid === store.getState().selected,
    open: false
  }

  handleClick = (id, locked) => event => {
    const selected = store.getState().selected

    if (locked) {
      window.alert(
        'Esta matéria esta travada por estar sendo editada por outra pessoa.'
      )
      return
    }

    if (id === selected) this.props.actions.selecionaItemDeMateria('')
    else {
      this.props.actions.selecionaItemDeMateria(this.props.materiaPorColuna.uid)
    }
    this.setState({ selected: !this.state.selected })
  }

  toolTip = () => {
    this.setState({ open: !this.state.open })
  }

  render () {
    const { materiaPorColuna, coluna } = this.props
    const selected = store.getState().selected

    const transicoes = materiaPorColuna.transitions.map((transicao, index) => {
      return (
        !(transicao === materiaPorColuna.coluna) && (
          <BotoesLista key={index}>
            <Botao
              coluna={materiaPorColuna.coluna}
              transicao={transicao}
              uid={materiaPorColuna.uid}
            />
          </BotoesLista>
        )
      )
    })

    const eventos =
      materiaPorColuna.coluna === 'publicado' && materiaPorColuna.acoes[0]
        ? materiaPorColuna.acoes.map((acao, index) => {
          return (
            <BotoesLista key={index}>
              <Botao
                coluna='publicado'
                acao={acao.texto}
                uid={materiaPorColuna.uid}
              />
            </BotoesLista>
          )
        })
        : ''

    return (
      <EstiloLista
        coluna={coluna}
        onClick={
          this.props.materiaPorColuna.locked
            ? this.handleClick(
              this.props.materiaPorColuna.uid,
              this.props.materiaPorColuna.locked
            )
            : () => false
        }
        selected={this.state.selected === selected}
      >
        <Topo>
          {materiaPorColuna.locked && (
            <Icone
              className='fas fa-lock'
              onMouseEnter={this.toolTip}
              onMouseLeave={this.toolTip}
            >
              <ToolTip
                open={this.state.open}
                render={() => (
                  <Tip esquerda='true'>{materiaPorColuna.locked}</Tip>
                )}
              />
            </Icone>
          )}
          <BadgeData>{materiaPorColuna.data}</BadgeData>

          {materiaPorColuna.infoextra[0] && (
            <Icone
              className={materiaPorColuna.infoextra[0].icone}
              onMouseEnter={this.toolTip}
              onMouseLeave={this.toolTip}
            >
              <ToolTip
                open={this.state.open}
                render={() => (
                  <Tip esquerda=''>{materiaPorColuna.infoextra[0].titulo}</Tip>
                )}
              />
            </Icone>
          )}
        </Topo>

        {this.props.requisicao.status === 'loading' &&
          (this.props.materiaPorColuna.uid === this.props.requisicao.uid && (
            <Spinner />
          ))}

        <Titulo>
          <i className={`${materiaPorColuna.icone} mright-1`} />
          {materiaPorColuna.imagens_materia && (
            <span className='mright-05'>
              {materiaPorColuna.imagens_materia}
            </span>
          )}

          {materiaPorColuna.conteudo !== 'Senado Agora' && (
            <a
              href={`${URLSITE || 'http://localhost:8090/noticias'}${
                materiaPorColuna.url
              }`}
            >
              {materiaPorColuna.titulo}
            </a>
          )}

          {materiaPorColuna.conteudo === 'Senado Agora' && (
            <a
              href={`${URLSITE || 'http://localhost:8090/noticias'}${
                materiaPorColuna.url
              }`}
            >
              {materiaPorColuna.titulo}: {materiaPorColuna.descricao}
            </a>
          )}
        </Titulo>

        <Autor>{materiaPorColuna.autor}</Autor>

        {!this.props.materiaPorColuna.locked &&
          materiaPorColuna.transitions.length > 0 && (
          <MaisConteudo
            handleClick={this.handleClick}
            uid={materiaPorColuna.uid}
            selected={this.state.selected}
            recebeMaterias={this.props.actions.recebeMaterias}
          />
        )}

        {this.props.materiaPorColuna.uid === this.props.selected &&
          !this.props.materiaPorColuna.locked && (
          <Drop>
            <Label>Enviar o item para:</Label>
            <BotoesContainer>{transicoes}</BotoesContainer>
            <BotoesContainer>{eventos}</BotoesContainer>
          </Drop>
        )}
      </EstiloLista>
    )
  }
}

const mapStateToProps = state => {
  return { selected: state.selected, requisicao: state.requisicao }
}

const ItemMateria = connect(
  mapStateToProps,
  bindActions(actions)
)(ItemMateriaToConnect)

export default ItemMateria
