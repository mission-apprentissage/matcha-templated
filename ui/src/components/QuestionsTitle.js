import React from 'react'
import styled from 'styled-components'

import color from './helper/color'
import enter from '../assets/images/enter.svg'

const Wrapper = styled.div`
  margin: 1rem 0;
`

const Title = styled.p`
  color: ${color.black};
  margin-bottom: 0;
  ::after {
    content: '*';
    color: ${color.red};
    padding-left: 0.25rem;
  }
`

const Subtitle = styled.p`
  margin-top: 0;
  font-style: italic;
  font-size: 0.75rem;
`

export default ({ title, subtitle }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  )
}
