import React from 'react'
import { Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../context'

import leaf from '../assets//images/leaf.svg'
import { RadioButton, Title } from '../components'

export default () => {
  const { profile } = React.useContext(Context)
  let history = useHistory()
  console.log(!profile, !!profile.user)

  React.useEffect(() => {
    // setTimeout(() => {
    //   history.push('/first')
    // }, 1250)
  })

  return (
    <Col className='d-flex justify-content-start flex-column mt-5'>
      <Title>
        Enchanté, moi c'est Matcha,
        <br /> l'assistant des futurs apprentis
      </Title>
      {!profile === false ? (
        <>
          <Title>
            Etes-vous bien à la recherche
            <br /> d'un <strong>contrat d'apprentissage</strong> ?
          </Title>
          <div className='d-md-flex justify-content-between'>
            <RadioButton onClick={() => history.push('/first')}>Oui !</RadioButton>
            <div className='p-1'></div>
            <RadioButton onClick={() => history.push('/autres')}>Non</RadioButton>
          </div>
        </>
      ) : null}
      <Link className='d-flex justify-content-center' to='/first'>
        <img alt='logo' className='mt-5' src={leaf} />
      </Link>
    </Col>
  )
}
