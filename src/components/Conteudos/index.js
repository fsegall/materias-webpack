import React, { Component } from 'react'
import { Container, CounterBox } from './styles'

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
