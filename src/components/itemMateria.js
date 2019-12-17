import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import MaisConteudo from './maisConteudo'
import '../scss/app.scss'
import styled from 'styled-components'
import Botao from './botao'
import store from '../redux/store/'
import { bindActions } from './utils'
import ToolTip from './toolTip'

export const EstiloLista = styled.li`
  display: flex;
  display: -ms-flexbox
  flex-direction: column;
  -ms-flex-direction: -ms-column;
  
  -webkit-animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  color: ${props => {
    let cor
    switch (props.coluna) {
      case 'privado':
        cor = 'red'
        break
      case 'pendente':
        cor = '#ffa500'
        break
      case 'liberado':
        cor = 'green'
        break
      case 'publicado':
        cor = '#337ab7'
        break
      case 'arquivado':
        cor = '#464646'
        break
    }
    return cor
  }};
  padding: 0.2rem;
  border: 1px solid lightgrey;
  margin: 0.3rem;
  border-radius: 3px;
  background-color: ${props => (props.draggingOver ? 'lightgrey' : '#fff')};
  border: ${props =>
    props.draggingOver ? '1px solid grey' : '1px solid lightgrey'};
  min-height: 2.5rem;
  &:hover {
    background-color: #e5e7e8;
    cursor: default;
  }
  a:hover,
  i:hover {
    cursor: pointer;
  }
`

const Topo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BadgeData = styled.div`
  width: fit-content;
  padding: 0 0.2rem;
  margin: 0.3rem 0.3rem 1rem 0.3rem;
  background-color: #ededed;
  border-radius: 2px;
  box-shadow: 3px 4px 6px rgba(68, 68, 68, 0.5);
  height: fit-content;
`

const Icone = styled.i`
  margin: 0.3rem;
  width: fit-content;
  justify-self: flex-start;
`

const Titulo = styled.div`
  padding: 0.2rem 1rem;
  text-align: left;
`

const Autor = styled.h3`
  padding: 0.5rem;
  color: #848484;
  font-size: 0.8rem;
  text-align: left;
  display: inline-block;
`

const BotoesContainer = styled.ul`
  list-style-type: none;
  display: inline-flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`
const BotoesLista = styled.li`
  margin: 0.2rem;
`
const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
`
const Label = styled.span`
  margin: 0.5rem;
  color: #464646;
`

const Drop = styled.div`
  -webkit-animation: scale-in-ver-top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: scale-in-ver-top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const Tip = styled.div`
  left: ${props => (props.esquerda ? '0' : '65%')};
  margin-top: 0.5rem;
  width: fit-content;
  padding: 0 0.2rem;
  margin: 0.3rem 0.3rem 1rem 0.3rem;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 3px 4px 6px rgba(68, 68, 68, 0.5);
  height: fit-content;
  position: absolute;
`

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
            <a href={URLSITE + materiaPorColuna.url}>
              {materiaPorColuna.titulo}
            </a>
          )}

          {materiaPorColuna.conteudo === 'Senado Agora' && (
            <a href={URLSITE + materiaPorColuna.url}>
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
