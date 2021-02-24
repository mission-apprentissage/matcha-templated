import React from 'react'
import styled from 'styled-components'
import color from './helper/color'

const Button = styled.button`
  background: ${color.white};
  box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.12);
  border-radius: 40px;
  outline: none;
  border: none;
  padding: 0.825rem 1.5rem;
  width: 100%;
  margin: 0.5rem 0.1rem;
  :hover {
    box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.24);
  }
  :focus {
    background: ${color.grey};
    color: ${color.white};
    outline: none;
  }
  ${(props) =>
    props.state === true &&
    `
    background: ${color.grey};
    color: white;
    outline:none;
    `}
  ${(props) =>
    props.state === false &&
    `
    background: ${color.grey};
    color: white;
    outline:none;
    `}
`
export default (props) => {
  return <Button {...props}>{props.children}</Button>
}
