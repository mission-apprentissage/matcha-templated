import React from 'react'
import styled from 'styled-components'
import color from './helper/color'

const Input = styled.input`
  border: 1px solid ${color.middleGrey};
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Inter;
  font-size: 1rem;
  padding-left: 10px;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  margin-bottom: 2rem;
  width: 100%;
  outline: none;
  background: ${color.white};
  ${(props) =>
    props.value &&
    `
    border: 1px solid ${color.black};
    `}
  ${(props) =>
    props.suggestion &&
    `
    margin-bottom: 0;
    `}
  ::placeholder {
    color: ${color.middleGrey};
  }
  :hover {
    border: 1px solid ${color.grey};
  }
  :focus {
    border: 1px solid ${color.red};
    background: ${color.white} !important;
    color: ${color.black};
  }
  :disabled {
    border: 1px solid ${color.lightGrey};
    background: ${color.lightGrey};
  }
`

export default (props) => <Input {...props} />
