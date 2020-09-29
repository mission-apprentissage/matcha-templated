import React from 'react'
import { Navbar, Container, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '../context'
import styled from 'styled-components'

import logo from '../assets/images/logo.svg'
import color from './helper/color'

const DropBtn = styled.button`
  background: none;
  border: none;
  color: ${color.black};
  :focus {
    outline: none;
  }
`

export default () => {
  const {
    profile: { user },
  } = React.useContext(Context)
  return (
    <Navbar className='backgrd'>
      <Container className='d-flex align-items-center'>
        <Navbar.Brand>
          <Link to='/'>
            <img src={logo} className='d-inline-block align-top' alt='logo matcha' />
          </Link>
        </Navbar.Brand>
        <Navbar.Text className='ml-auto '>
          {user && (
            <Dropdown alignRight>
              <Dropdown.Toggle as={DropBtn}>{user.username}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Text>
      </Container>
    </Navbar>
  )
}
