import styled from 'styled-components'
export const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  border: 1px solid lightgrey;
  display: inline-flex;
  background-color: ${props => {
    let cor
    switch (props.transicao) {
      case 'privado':
        cor = '#eb7575'
        break
      case 'pendente':
        cor = '#f4d442'
        break
      case 'liberado':
        cor = '#d8f296'
        break
      case 'publicado':
        cor = '#96cdf2'
        break
    }
    return cor
  }};
`
