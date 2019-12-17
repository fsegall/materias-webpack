// Faz a grid de css para delimitar o container das colunas de matérias de forma dinâmica

import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  display: -ms-flexbox;
  -ms-flex-direction: column;
  -ms-flex-grow: 1;
  -ms-flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  margin: 1rem;
`

const Painel = props => {
  return <Container>{props.children}</Container>
}

export default Painel
