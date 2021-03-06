import React from 'react'
import styled from 'styled-components'
import leaf from '../assets/images/leaf-bubble.svg'

const Bubble = styled.div`
  font-family: Marianne;
  font-size: 1rem;
  background: ${(props) => (props.darken ? 'rgba(165, 165, 180, 0.16)' : '#FAFAFC')};
  border-radius: 16px 16px 16px 0px;
  padding: 0.5rem;
  margin-bottom: 1rem;
`
const LogoBubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  background: ${(props) => (props.darken ? 'rgba(165, 165, 180, 0.16)' : '#F2F2F7')};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`

const Wrapper = styled.div`
  display: flex;
  padding-bottom: ${(props) => props.margin || '2rem'};
`

export default ({ children, darken, bubble = true, margin }) => {
  return (
    <Wrapper margin={margin}>
      {bubble && (
        <LogoBubble darken={darken}>
          <img alt='logo' src={leaf} />
        </LogoBubble>
      )}
      <Bubble darken={darken}>{children}</Bubble>
    </Wrapper>
  )
}
