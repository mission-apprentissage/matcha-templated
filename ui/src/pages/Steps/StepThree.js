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
  Autocomplete,
} from '../../components'
import { Context } from '../../context'

const distance = [
  { label: 'à moins de 2 km', code: 2 },
  { label: 'à moins de 5 km', code: 5 },
  { label: 'à moins de 10 km', code: 10 },
  { label: 'à moins de 20 km', code: 20 },
  { label: 'à moins de 30 km', code: 30 },
]

export default () => {
  const { saveContext, profile } = React.useContext(Context)
  const [values, setValues] = React.useState(profile.mobilite ? profile.mobilite : {})
  const [submit, setSubmit] = React.useState(profile.mobilite ? true : false)
  const history = useHistory()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleValues = (name, value) => {
    setValues({ ...values, [name]: value })
    if (Object.keys(values).length === 2) {
      setSubmit(true)
    }
  }

  return (
    <Col>
      <StepTitle>Etape 3/6 - Votre Mobilité</StepTitle>
      <Autocomplete
        title='Dans quelle commune habitez-vous ?'
        placeholder='entrez votre ville'
        handleValues={handleValues}
        context={profile.mobilite && profile.mobilite.commune}
      />
      <QuestionTitle title='Avez-vous le permis de conduire ?' />
      <div className='d-md-flex justify-content-between'>
        <RadioButton onClick={() => handleValues('permis', true)} state={values.permis === true ? true : null}>
          Oui
        </RadioButton>
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
            {dist.label}
          </RadioButton>
        ))}
      </Row>
      <div className='mt-4'>
        <ChatBubble>
          Attention de bien disposer d’un moyen de déplacement ou d’une possibilité de logement pour vous rendre à
          l’entreprise
        </ChatBubble>
      </div>
      <div className='d-flex justify-content-between mb-5'>
        <Link to='step-two'>
          <PreviousButton className='gtm-previousbutton-stepthree' />
        </Link>
        <Link to='step-four'>
          <NextButton
            onClick={() => saveContext(history, 'mobilite', values, '/step-four')}
            disabled={!submit}
            className='gtm-nextbutton-stepthree'
          />
        </Link>
      </div>
    </Col>
  )
}
