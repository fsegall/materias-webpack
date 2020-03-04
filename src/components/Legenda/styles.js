import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
  padding: 1rem;
  justify-content: flex-end;
  grid-column: span 4;
  align-content: flex-start;
  @media (max-width: 767px) {
    padding: 0;
    align-content: center;
    justify-content: center;
  }
`
export const Lista = styled.ul`
  list-style-type: none;
  li {
    padding: 1rem;
    border: 1px solid #ccc;
    width: 9rem;
    margin: 0.4rem 0.2rem;
    color: #848484;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  @media (max-width: 767px) {
    li {
      padding: 0.8rem;
      border: none;
    }
  }
`
