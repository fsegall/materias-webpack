import React from 'react'
import { SiteHeader } from './styles'

const Header = props => {
  return (
    <SiteHeader>
      <a
        onClick={() => {
          props.clearTimer()
          props.atualiza()
          props.dataDePublicacao(new Date(Date.now()))
          props.setTimer()
        }}
      >
        Painel do Portal de Notícias
      </a>
    </SiteHeader>
  )
}

export default Header
