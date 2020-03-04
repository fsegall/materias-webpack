import styled from 'styled-components'

export const MenuSpy = styled.ul`
  display: none;
  @media (max-width: 1026px) {
    display: block;
    position: fixed;
    top: 10;
    right: 0;
    background-color: #fff;
    width: inherit;
    margin-top: 2rem;
    a {
      display: block;
      padding: 0.2rem 0.4rem;
      &:nth-child(even) {
        background-color: #f5f5f5;
      }
    }
  }
`
