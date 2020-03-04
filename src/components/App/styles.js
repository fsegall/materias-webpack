import styled from 'styled-components'

export const Container = styled.div`
  margin: 1rem;
  background-color: lightgray;
  padding: 1rem;
  width: fit-content;
  @media (max-width: 767px) {
    width: auto;
  }
`

export const ResponsiveMenu = styled.div`
  display: none;
  z-index: 999;
  @media (max-width: 1026px) {
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
    color: #8d8d8d;
    position: fixed;
    right: 0;
    top: 10;
  }
`
export const Label = styled.span`
  margin-right: 0.5rem;
  color: #337ab7;
  font-weight: bold;
`
export const Botao = styled.button`
  margin-left: 0.4rem;
  background-color: lightblue;
  border: none;
  color: #4d4d4d;
  padding: 0.2rem 0.5rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #a5cbea;
  }
  @media (max-width: 767px) {
    margin-top: 1rem;
    width: 100% !important;
    margin-left: 0;
  }
`
export const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  margin-left: 2rem;
`

export const Atualizacao = styled.div`
  float: right;
  color: #464646;
  margin: 1rem;
  @media (max-width: 1026px) {
    float: inherit;
    font-size: 0.8rem;
    margin-right: 4rem;
  }
`

export const LinkNoticias = styled.img`
  width: 160px;
  margin-top: 1rem;
  margin-left: 1rem;
  z-index: 999;

  @media (max-width: 767px) {
    width: 80px;
    margin-top: 1rem;
    margin-left: 1rem;
    z-index: 999;
  }
`

export const LinkArquivadas = styled.a`
  color: #999;
  padding: 1rem 0;
  float: right;
  &:hover {
    color: #337ab7;
  }
`
