// Componente para legenda dos ícones Fontawesome utilizados na aplicação

import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
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
const Lista = styled.ul`
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

export default function Legenda () {
  return (
    <Container>
      <Lista>
        <li>
          <i className='far fa-edit fa-2x' />
          <span className='mleft-1'>Matéria</span>
        </li>
        <li>
          <i className='far fa-image fa-2x' />
          <span className='mleft-1'>Imagem</span>
        </li>
        <li>
          <i className='fas fa-file-alt fa-2x' />
          <span className='mleft-1'>Legendas</span>
        </li>
        <li>
          <i className='fas fa-video fa-2x' />
          <span className='mleft-1'>Video</span>
        </li>
        <li>
          <i className='fas fa-volume-up fa-2x' />
          <span className='mleft-1'>Áudio</span>
        </li>
      </Lista>

      <Lista>
        <li>
          <i className='fas fa-project-diagram fa-2x' />
          <span className='mleft-1'>Infográfico</span>
        </li>
        <li>
          <i className='fas fa-file-invoice fa-2x' />
          <span className='mleft-1'>Infomatéria</span>
        </li>
        <li>
          <i className='fas fa-book fa-2x' />
          <span className='mleft-1'>E-cidadania</span>
        </li>
        <li>
          <i className='fas fa-home fa-2x' />
          <span className='mleft-1'>Na Home</span>
        </li>
        <li className='mleft-1'>
          <i className='far fa-clock fa-2x' />
          <span className='mleft-1 small'>Senado Agora</span>
        </li>
      </Lista>
    </Container>
  )
}
