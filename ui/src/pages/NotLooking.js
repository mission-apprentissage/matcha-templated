import React from 'react'
import { Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Title, ExternalLink, RadioButton } from '../components'

export default () => {
  let history = useHistory()
  return (
    <Col className='d-flex justify-content-start flex-column mt-5'>
      <Title>
        Vous êtes à la recherche
        <br /> d'un <strong>Stage</strong> ou d'un{' '}
        <strong>
          contrat de
          <br />
          professionnalisation ?
        </strong>
      </Title>
      <Title>Découvrez les entreprises qui recrutent régulièrement :</Title>
      <ExternalLink onClick={() => (window.location.href = 'https://labonnealternance.pole-emploi.fr/recherche')}>
        C'est parti
      </ExternalLink>
      <RadioButton onClick={() => history.push('/au-revoir')}>Peut être une autre fois</RadioButton>
    </Col>
  )
}
