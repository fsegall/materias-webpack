import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Conteudos from './conteudos'
import ItemMateria from './itemMateria'
import store from '../redux/store'
import { Spinner } from './App'

// Faz um div de container com scss usando a biblioteca Styled Components
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 4px;
  /* Checa as props do componente para setar o css de forma condicional */
  background-color: ${props => (props.isDraggingOver ? 'lightgrey' : '#eee')};
  min-height: 200px;
`
const ContainerList = styled.ul`
  padding: 0;
  list-style-type: none !important;
  &:hover {
    cursor: pointer;
  }
`

const CounterBox = styled.div`
  font-size: 1.4rem;
  display: flex;
  background-color: #ededed;
  float: right;
  height: 2.8rem;
  width: 2.8rem;
  border-radius: 50%;
  justify-content: space-evenly;
  align-items: center;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }
  -webkit-animation: jello-horizontal 0.9s both;
  animation: jello-horizontal 0.9s both;
`

const HeaderColuna = styled.h2`
  font-size: 1.6rem;
  text-transform: capitalize;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    let cor
    switch (props.nomeColuna) {
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
        cor = '#999'
        break
    }
    return cor
  }};
`
const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
`

const DatePublicado = styled.div`
  display: inline-block;
  background: #fff;
  margin: 0.5rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
`
// Função que faz o map para gerar a lista de matérias por coluna

const materiasPorStatus = (listaDeMaterias, statusMateria) =>
  listaDeMaterias[0] ? (
    listaDeMaterias.map(materiaPorColuna => (
      <ItemMateria
        key={materiaPorColuna.uid}
        materiaPorColuna={materiaPorColuna}
        coluna={statusMateria}
      />
    ))
  ) : (
    <li className='list-group-item mleft-1 mright-1 mtop-1'>
      Não existe nenhuma matéria com status de {statusMateria}.
    </li>
  )

class Coluna extends Component {
  // Cria state para o filtro de materias - Setado para visualizar todas por padrão
  state = {
    filtro: 'Todas'
  }

  // Setar a propriedade filtro do state para uma string com o valor do campo select selecionado no evento
  setFilter = evt => {
    this.setState({
      filtro: evt.target.value
    })
  }

  handleOnClick = filtro => {
    this.setState({
      filtro
    })
  }

  render () {
    // Desestrutura props para referenciar pelo nome
    const {
      nomeColuna,
      counter,
      conteudos,
      listaPorColuna,
      dataDaBusca
    } = this.props

    // Função para filtrar os conteúdos por tipo de matéria

    const dadosFiltrados = listaPorColuna.filter(materia => {
      const { filtro } = this.state

      switch (filtro) {
        case 'Todas':
          return true

        case 'Senado Agora':
          return materia.conteudo === 'Senado Agora'

        case 'Matérias':
          return materia.conteudo !== 'Senado Agora' // Quando for filtrar individualmente os outros conteúdos setar para === "nome do conteudo", por enquanto só separamos Senado Agora de outras.
      }
    })

    return (
      <div>
        {/*         <select onChange={this.setFilter}>
          <option value='Todas'>Todos</option>
          <option value='Senado Agora'>Senado Agora</option>
          <option value='Materia'> Materias </option>
        </select> */}

        <HeaderColuna nomeColuna={nomeColuna}>
          {nomeColuna}
          <CounterBox onClick={() => this.handleOnClick('Todas')}>
            {counter}
          </CounterBox>
        </HeaderColuna>

        <Container>
          <Conteudos
            conteudos={conteudos}
            handleOnClick={filtro => this.handleOnClick(filtro)}
            dadosFiltrados={dadosFiltrados}
          />
          <Flex>
            {nomeColuna === 'publicado' && (
              <DatePublicado>
                {Array.isArray(dataDaBusca)
                  ? moment(dataDaBusca[0]).format('DD/MM/YYYY')
                  : moment(dataDaBusca).format('DD/MM/YYYY')}
              </DatePublicado>
            )}
          </Flex>
          <ContainerList>
            {store.getState().requisicao.status === 'loading' &&
            store.getState().requisicao.uid === ''
              ? nomeColuna === 'publicado' && <Spinner />
              : ''}
            {materiasPorStatus(dadosFiltrados, nomeColuna)}
          </ContainerList>
        </Container>
      </div>
    )
  }
}

export default Coluna
