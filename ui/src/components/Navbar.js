import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Context } from '../context'
import styled from 'styled-components'

import logo from '../assets/images/logo.svg'
import color from './helper/color'

const DropBtn = styled(Navbar.Text)`
  color: ${color.black} !important;
`

export default () => {
  const {
    profile: { candidat },
  } = React.useContext(Context)
  return (
    <Navbar className='backgrd'>
      <Container className='d-flex align-items-center'>
        <Navbar.Brand>
          <img src={logo} className='d-inline-block align-top' alt='logo matcha' />
        </Navbar.Brand>
        {candidat && (
          <Navbar.Text className='ml-auto' as={DropBtn}>
            {candidat.prenom} {candidat.nom.substring(0, 1).toUpperCase()}.
            {/* <Dropdown alignRight>
              <Dropdown.Toggle as={DropBtn}>{candidat.prenom}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Navbar.Text>
        )}
      </Container>
    </Navbar>
  )
}
