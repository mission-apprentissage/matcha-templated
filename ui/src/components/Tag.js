import styled from 'styled-components'
import close from '../assets/images/close.svg'
import color from './helper/color'

export default styled.button`
  font-family: Inter;
  background: ${color.redLight};
  border-radius: 40px;
  color: white;
  border: none;
  display: flex;
  margin-top: 0.15rem;
  ::after {
    content: url(${close});
    color: ${color.white};
    padding-left: 0.5rem;
  }
  &:hover {
    background: ${color.red};
  }
`
