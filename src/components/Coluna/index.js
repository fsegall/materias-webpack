import React, { Component } from 'react'
import {
  Container,
  ContainerList,
  CounterBox,
  HeaderColuna,
  Flex,
  DatePublicado
} from './styles'
import moment from 'moment'
import Conteudos from '../Conteudos'
import ItemMateria from '../ItemMateria/itemMateria'
import store from '../../redux/store'
import { Spinner } from '../App/styles.js'

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
