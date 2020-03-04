// Componente para legenda dos ícones Fontawesome utilizados na aplicação

import React from 'react'
import { Container, Lista } from './styles'

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
