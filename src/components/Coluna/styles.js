import styled from 'styled-components'
// Faz um div de container com scss usando a biblioteca Styled Components
export const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 4px;
  /* Checa as props do componente para setar o css de forma condicional */
  background-color: ${props => (props.isDraggingOver ? 'lightgrey' : '#eee')};
  min-height: 200px;
`
export const ContainerList = styled.ul`
  padding: 0;
  list-style-type: none !important;
  &:hover {
    cursor: pointer;
  }
`

export const CounterBox = styled.div`
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

export const HeaderColuna = styled.h2`
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
export const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
`
export const DatePublicado = styled.div`
  display: inline-block;
  background: #fff;
  margin: 0.5rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
`
