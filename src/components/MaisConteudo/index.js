import React, { Component } from 'react'
import { Container } from './styles'
import store from '../../redux/store'

class MaisConteudo extends Component {
  render () {
    return (
      <Container
        onClick={event => {
          this.props.handleClick(this.props.uid, false)(event)
          this.props.recebeMaterias(store.getState().materias)
        }}
      >
        <i
          className={
            store.getState().selected === this.props.uid
              ? 'fas fa-minus mbot-3'
              : 'fas fa-plus'
          }
        />
      </Container>
    )
  }
}

export default MaisConteudo
