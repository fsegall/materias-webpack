import React, { Component } from 'react'
import styled from 'styled-components'
import store from '../redux/store/'

const Container = styled.div`
  position: absolute;
  bottom: 15px;
  right: 10px;
`

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
