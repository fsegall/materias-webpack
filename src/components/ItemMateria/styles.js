import styled from 'styled-components'

export const EstiloLista = styled.li`
  display: flex;
  display: -ms-flexbox
  flex-direction: column;
  -ms-flex-direction: -ms-column;
  
  -webkit-animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  color: ${props => {
    let cor
    switch (props.coluna) {
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
        cor = '#464646'
        break
    }
    return cor
  }};
  padding: 0.2rem;
  border: 1px solid lightgrey;
  margin: 0.3rem;
  border-radius: 3px;
  background-color: ${props => (props.draggingOver ? 'lightgrey' : '#fff')};
  border: ${props =>
    props.draggingOver ? '1px solid grey' : '1px solid lightgrey'};
  min-height: 2.5rem;
  &:hover {
    background-color: #e5e7e8;
    cursor: default;
  }
  a:hover,
  i:hover {
    cursor: pointer;
  }
`

export const Topo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const BadgeData = styled.div`
  width: fit-content;
  padding: 0 0.2rem;
  margin: 0.3rem 0.3rem 1rem 0.3rem;
  background-color: #ededed;
  border-radius: 2px;
  box-shadow: 3px 4px 6px rgba(68, 68, 68, 0.5);
  height: fit-content;
`

export const Icone = styled.i`
  margin: 0.3rem;
  width: fit-content;
  justify-self: flex-start;
`

export const Titulo = styled.div`
  padding: 0.2rem 1rem;
  text-align: left;
`

export const Autor = styled.h3`
  padding: 0.5rem;
  color: #848484;
  font-size: 0.8rem;
  text-align: left;
  display: inline-block;
`

export const BotoesContainer = styled.ul`
  list-style-type: none;
  display: inline-flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`
export const BotoesLista = styled.li`
  margin: 0.2rem;
`
export const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
`
export const Label = styled.span`
  margin: 0.5rem;
  color: #464646;
`

export const Drop = styled.div`
  -webkit-animation: scale-in-ver-top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: scale-in-ver-top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

export const Tip = styled.div`
  left: ${props => (props.esquerda ? '0' : '65%')};
  margin-top: 0.5rem;
  width: fit-content;
  padding: 0 0.2rem;
  margin: 0.3rem 0.3rem 1rem 0.3rem;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 3px 4px 6px rgba(68, 68, 68, 0.5);
  height: fit-content;
  position: absolute;
`
