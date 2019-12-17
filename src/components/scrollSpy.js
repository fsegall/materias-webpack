import AnchorLink from 'react-anchor-link-smooth-scroll'
import React from 'react'
import styled from 'styled-components'

// Menu hamburguer para mobile

const MenuSpy = styled.ul`
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
