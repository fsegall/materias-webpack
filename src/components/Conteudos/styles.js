import styled from 'styled-components'

export const Container = styled.div`
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

export const CounterBox = styled.div`
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
