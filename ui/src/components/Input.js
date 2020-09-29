import React from 'react'
import styled from 'styled-components'
import edit from '../assets/images/edit.svg'

import color from './helper/color'

const Wrapper = styled.div`
  width: 100%;
  span {
    position: absolute;
    right: 20px;
    padding-top: 3px;
  }
`

// export default styled.input`
const Input = styled.input`
  border: 1px solid ${color.middleGrey};
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Inter;
  font-size: 1rem;
  padding-left: 10px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
  width: 100%;
  outline: none;
  /* background: ${(props) => (props.filled ? color.lightGrey : color.white)}; */
  ::placeholder {
    color: #98b0b7;
  }
  ${(props) =>
    props.value &&
    `
    border: 1px solid ${color.black};
  `}
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

export default (props) => {
  return (
    // <Wrapper>
    //   {!props.hide && props.value && (
    //     <span>
    //       <img src={edit} alt='edit' />
    //     </span>
    //   )}
    <Input {...props} />
    // </Wrapper>
  )
}
