import styled from 'styled-components'
import color from './helper/color'

export default styled.button`
  width: 100%;
  background: ${color.white};
  border: none;
  box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.12);
  border-radius: 40px;
  padding: 0.75rem;
  &:hover {
    box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.24);
  }
  outline: none;
  &:focus {
    outline: none;
  }
  ${(props) =>
    props.experience
      ? `
      background: #FAFAFC;
      color: ${color.red};
      border-radius: 8px;
      box-shadow: none;
      margin-bottom: 2rem;
  `
      : `
      :focus{
        background: #084355;
        box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.12);
        border-radius: 40px;
        color: #FFFFFF;
        outline:none;
      }  
  `}
`
