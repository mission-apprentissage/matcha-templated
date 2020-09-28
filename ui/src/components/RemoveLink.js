import styled from 'styled-components'
import color from './helper/color'

export default styled.a`
  text-decoration-line: underline;
  color: ${color.red};
  cursor: pointer;
  :hover {
    color: ${color.red};
  }
`
