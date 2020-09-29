import React from 'react'
import styled from 'styled-components'
import arrow from '../assets/images/left.svg'

import color from './helper/color'

const Button = styled.button`
  background: ${color.veryLightGrey};
  border-radius: 40px;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  color: ${color.black};
  border: none;
  :before {
    padding-right: 1rem;
    content: url(${arrow});
  }
  :focus {
    outline: none;
  }
  :hover {
    background: ${color.lightGrey};
  }
`

export default () => {
  return <Button>Retour</Button>
}
