import React from 'react'
import { Col } from 'react-bootstrap'
import { Title } from '../components'

export default () => {
  React.useEffect(() => {
    setTimeout(() => {
      window.location.href = 'https://labonnealternance.pole-emploi.fr/'
    }, 1250)
  })
  return (
    <Col className='d-flex justify-content-start flex-column mt-5'>
      <Title>
        Merci d'être passé.e sur <br /> Matcha. À bientôt !
      </Title>
    </Col>
  )
}
