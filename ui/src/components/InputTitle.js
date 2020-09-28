import styled from 'styled-components'
import color from './helper/color'

export default styled.p`
  font-family: Inter;
  margin-bottom: 0.5rem;
  ${(props) =>
    props.mandatory &&
    `
  ::after {
    content: '*';
    color: ${color.red};
    padding-left: 0.25rem;
  }
  `}
  ${(props) =>
    props.bold &&
    `
    font-family:Inter-Bold;
    font-weight: 700;
  `}
`
