// Faz a grid de css para delimitar o container das colunas de matérias de forma dinâmica

import React from 'react'
import { GridContainer } from './styles'

const Grid = props => {
  return <GridContainer>{props.children}</GridContainer>
}

export default Grid
