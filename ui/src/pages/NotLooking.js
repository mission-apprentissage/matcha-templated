import React from 'react'
import { Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Title, ExternalLink, RadioButton } from '../components'
import styled from 'styled-components'

const StyledStrong = styled.strong`
  font-family: marianne-bold;
`

export default () => {
  let history = useHistory()
  return (
    <Col className='d-flex justify-content-start flex-column mt-5'>
      <Title>
        Vous êtes à la recherche
        <br /> d'un <StyledStrong>Stage</StyledStrong> ou d'un{' '}
        <StyledStrong>
          contrat de
          <br />
          professionnalisation ?
        </StyledStrong>
      </Title>
      <Title>Découvrez les entreprises qui recrutent régulièrement :</Title>
      <ExternalLink
        onClick={() => (window.location.href = 'https://labonnealternance.pole-emploi.fr/recherche')}
        className='gtm-lbabutton-notlooking'
      >
        C'est parti
      </ExternalLink>
      <RadioButton onClick={() => history.push('/au-revoir')} className='gtm-nextbutton-notlooking'>
        Peut être une autre fois
      </RadioButton>
    </Col>
  )
}
