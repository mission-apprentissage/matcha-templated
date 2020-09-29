import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import {
  StepTitle,
  ChatBubble,
  NextButton,
  PreviousButton,
  RadioButton,
  QuestionTitle,
  CheckButton,
  Autocomplete,
} from '../../components'
import { Context } from '../../context'

const distance = ['à moins de 2 km', 'à moins de 5 km', 'à moins de 10 km', 'à moins de 20 km', 'à moins de 30 km']

export default () => {
  const { updateUser, profile } = React.useContext(Context)
  const [values, setValues] = React.useState(profile.mobility ? profile.mobility : {})
  const [submit, setSubmit] = React.useState(false)
  const history = useHistory()

  const handleValues = (name, value) => {
    setValues({ ...values, [name]: value })
    if (Object.keys(values).length === 2) {
      setSubmit(true)
    }
  }

  const handleSubmit = () => {
    updateUser({ mobility: values })
    history.push('/step-four')
  }

  return (
    <Col>
      <StepTitle>Etape 3/6 - Votre Mobilité</StepTitle>
      <Autocomplete
        title='Dans quelle commune habitez-vous ?'
        placeholder='entrez votre ville'
        handleValues={handleValues}
        context={profile.mobility && profile.mobility.name}
      />
      <QuestionTitle title='Avez-vous le permis de conduire ?' />
      <div className='d-md-flex justify-content-between'>
        <RadioButton onClick={() => handleValues('permis', true)} state={values.permis === true ? true : null}>
          Oui
        </RadioButton>
        <div className='p-1'></div>
        <RadioButton
          onClick={() => setValues({ ...values, permis: false })}
          state={values.permis === false ? false : null}
        >
          Non
        </RadioButton>
      </div>
      <QuestionTitle title="Jusqu'à quelle distance êtes-vous prêt.e à vous déplacer ?" />
      <Row>
        {distance.map((dist, i) => (
          <RadioButton
            key={i}
            onClick={() => handleValues('distance', dist)}
            state={values.distance === dist ? true : null}
          >
            {dist}
          </RadioButton>
        ))}
      </Row>
      <ChatBubble>
        Attention de bien disposer d’un moyen de déplacement ou d’une possibilité de logement pour vous rendre à
        l’entreprise
      </ChatBubble>
      <div className='d-flex justify-content-between mb-5'>
        <Link to='step-two'>
          <PreviousButton />
        </Link>
        <Link to='step-four'>
          <NextButton onClick={() => handleSubmit()} disabled={!submit} />
        </Link>
      </div>
    </Col>
  )
}
