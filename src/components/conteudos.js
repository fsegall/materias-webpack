import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${props =>
    props.agora === 'Senado Agora' ? '#eb7575' : 'lightblue'};
  color: ${props =>
    props.agora === 'Senado Agora' ? 'white !important' : '#337ab7'};
  height: 1.5rem;
  text-align: center;
  color: #337ab7;
  border-radius: 4px;
  width: fit-content;
  padding: 0.8rem;
  display: inline-flex;
  align-items: center;
  margin: 0.3rem 0 0 0.3rem;
  &:hover {
    cursor: pointer;
    background-color: ${props =>
    props.agora === 'Senado Agora' ? '#c60b3a' : '#a5cbea'};
  }
`

const CounterBox = styled.div`
  display: flex;
  padding: 0.1rem;
  margin-left: 0.5rem;
  background-color: #fff;
  float: right;
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 2px;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 767px) {
    align-items: end;
  }
  color: #337ab7 !important;
`

class Conteudos extends Component {
  state = {
    filtro: false,
    hasClass: ''
  }

  shouldComponentUpdate = prevProps => {
    return prevProps.conteudos !== this.props.conteudos
  }

  componentDidUpdate = prevProps => {
    if (prevProps.conteudos !== this.props.conteudos) {
      this.setState({
        hasClass: 'jello-horizontal'
      })
    }
  }

  render () {
    const { conteudos, handleOnClick } = this.props

    // Refatorar para ordenar em ordem alfabética das chaves dos objetos de conteúdo (para outros produtos)

    let sortedConteudos = []

    if (
      (conteudos[0] && Object.keys(conteudos[0])[0]) !== 'Matérias' &&
      conteudos.length === 2
    ) {
      sortedConteudos[0] = conteudos[1]
      sortedConteudos[1] = conteudos[0]
    } else {
      sortedConteudos = [...conteudos]
    }

    const conteudoBox = sortedConteudos[0] ? (
      sortedConteudos.map((conteudo, index) => {
        return (
          Object.values(conteudo)[0] !== 0 && (
            <Container
              agora={Object.keys(conteudo)[0]}
              key={index}
              onClick={e => {
                handleOnClick(Object.keys(conteudo)[0])
                this.setState({
                  filtro: !this.state.filtro
                })
              }}
            >
              <span>
                {Object.keys(conteudo)[0] === 'Matérias'
                  ? 'Matérias'
                  : 'Senado Agora'}
              </span>
              <CounterBox
                className={this.state.hasClass}
                agora={Object.keys(conteudo)[0]}
              >
                {Object.values(conteudo)[0]}
              </CounterBox>
            </Container>
          )
        )
      })
    ) : (
      <div />
    )

    return <div>{conteudoBox}</div>
  }
}

export default Conteudos
