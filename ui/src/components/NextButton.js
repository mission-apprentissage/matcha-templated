import React from 'react'
import styled from 'styled-components'
import arrow from '../assets/images/right.svg'

import color from './helper/color'

const Button = styled.button`
  background: ${color.redLight};
  border-radius: 40px;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  color: white;
  border: none;
  :hover {
    background: ${color.red};
  }
  :focus {
    outline: none;
  }
  :disabled {
    background: ${color.middleGrey};
    color: rgba(8, 67, 85, 0.4);
    :after {
      content: none;
    }
  }
  ${(props) =>
    props.withIcon
      ? `
      :after {
    padding-left: 1rem;
    content: url(${arrow});
    color: white;
  }
  `
      : ``}
`

export default (props) => {
  return (
    <Button {...props} withIcon={props.withIcon ?? true}>
      {props.name || 'Suivant'}
    </Button>
  )
}
