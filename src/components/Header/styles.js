import styled from 'styled-components'

export const SiteHeader = styled.div`
  display: inline;
  text-decoration: none;
  text-align: center;
  font-size: 2.6rem;
  margin-top: 1rem;
  margin-left: 36rem !important;
  z-index: 999;
  a {
    font-size: 2.6rem;
    color: #337ab7;
    &:hover {
      color: #125b9b;
      cursor: pointer;
    }
    @media (max-width: 1326px) {
      font-size: 1.5rem;
      display: block;
    }
  @media (max-width: 1026px) {
    display: none;
  }
`
