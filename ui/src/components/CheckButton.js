import React from 'react'
import styled from 'styled-components'
import { Col } from 'react-bootstrap'

import color from './helper/color'

const Button = styled.button`
  background: #fafafc;
  border: none;
  outline: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  margin: 0.25rem 0;
  width: 100%;
  &:hover {
    background: #f2f2f7;
    color: ${color.black};
  }
  &:focus {
    background: #084355;
    color: #ffffff;
    outline: none;
  }
  ${(props) =>
    props.state === true &&
    `
    background: #084355;
    color: white;
    outline:none;
    `}
`

export default ({ btn, ...props }) => {
  return (
    <Col md={12} lg={6} className='d-flex align-items-stretch'>
      <Button {...props}>{btn}</Button>
    </Col>
  )
}
