import React from 'react'
import { Col } from 'react-bootstrap'
import { Title } from '../components'

export default () => {
  return (
    <Col className='d-flex justify-content-start flex-column mt-5'>
      <Title>
        Merci d'être passé.e sur <br /> Matcha. À bientôt !
      </Title>
    </Col>
  )
}
