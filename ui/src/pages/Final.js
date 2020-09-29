import React from 'react'
import { Col } from 'react-bootstrap'

import { Button, Title } from '../components'

export default () => {
  return (
    <Col className='m-5 d-flex flex-column flex-column'>
      <Title>Merci Prénom N. d'avoir complété votre profil !</Title>
      <Title className='mt-3 mb-5'>Je le transfère tout de suite aux entreprises que j'ai identifié pour vous.</Title>
      <Button>Sauvegarder mon profil</Button>
    </Col>
  )
}
