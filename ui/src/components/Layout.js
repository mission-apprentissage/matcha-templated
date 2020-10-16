import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar'

const StyledContainer = styled(Container)`
  height: 100vh;
  padding-left: 5px;
  padding-right: 5px;
`

export default ({ children }) => {
  const { pathname } = useLocation()
  const [bkg, setBkg] = useState(true)

  useEffect(() => {
    if (pathname.includes('step')) {
      setBkg(false)
    } else {
      setBkg(true)
    }
  }, [pathname])

  return (
    <>
      <Navbar />
      <StyledContainer fluid>
        <Row className={`h-100 justify-content-center ${bkg && 'backgrd'} `} sm={1} md={2} lg={2}>
          {children}
        </Row>
      </StyledContainer>
    </>
  )
}
