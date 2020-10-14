import React from 'react'
import { Col } from 'react-bootstrap'
import { Title, ExternalLink } from '../components'

export default () => {
  return (
    <Col className='d-flex justify-content-start flex-column mt-5'>
      <Title>
        Merci d'être passé.e sur <br /> Matcha. À bientôt !
      </Title>
      <ExternalLink
        onClick={() => (window.location.href = 'https://labonnealternance.pole-emploi.fr')}
        className='gtm-lbabutton-end'
      >
        Retourner sur la Bonne Alternance
      </ExternalLink>
    </Col>
  )
}
