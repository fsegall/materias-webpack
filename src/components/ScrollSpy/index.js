import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { MenuSpy } from './styles'

// Menu hamburguer para mobile

const ScrollSpy = () => {
  return (
    <MenuSpy>
      <AnchorLink className='link-privado' href='#privado'>
        Privado
      </AnchorLink>
      <AnchorLink className='link-pendente' href='#pendente'>
        Pendente
      </AnchorLink>
      <AnchorLink className='link-liberado' href='#liberado'>
        Liberado
      </AnchorLink>
      <AnchorLink className='link-publicado' href='#publicado'>
        Publicado
      </AnchorLink>
      {/*       <AnchorLink className='link-arquivado' href='#arquivado'>
        Arquivado
      </AnchorLink> */}
    </MenuSpy>
  )
}

export default ScrollSpy
