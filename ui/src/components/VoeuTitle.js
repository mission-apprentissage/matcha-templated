import React from 'react'
import styled from 'styled-components'
import color from './helper/color'

const VoeuNumber = styled.p`
  color: ${color.middleGrey};
  margin-bottom: 0;
  margin-top: 1rem;
`

const Voeu = styled.p`
  color: ${color.black};
`

export default ({ number, title }) => {
  return (
    <>
      <VoeuNumber>Voeu {number}</VoeuNumber>
      <Voeu>{title}</Voeu>
    </>
  )
}
