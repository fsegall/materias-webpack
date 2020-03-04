import styled from 'styled-components'

export const GridContainer = styled.div`
  display: grid;
  display: -ms-flexbox;
  -ms-flex-direction: column;
  -ms-flex-grow: 1;
  -ms-flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  margin: 1rem;
`
