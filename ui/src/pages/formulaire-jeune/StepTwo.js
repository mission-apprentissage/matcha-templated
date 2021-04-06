import React from 'react'
import { Col } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { StepTitle, ChatBubble, NextButton, PreviousButton, VoeuTitle, RadioButton } from '../../components'
import { Context } from '../../context'

const voeux = [
  { formation: 'BTS Chargé de projets industriels CAO et PLM au CESI de Nantes.' },
  { formation: 'BTS Chargé de projets industriels CAO et PLM au CESI de Nantes.' },
  { formation: 'BTS Chargé de projets industriels CAO et PLM au CESI de Nantes.' },
]

export default () => {
  const { updateUser, profile } = React.useContext(Context)
  const [values, setValues] = React.useState(profile.voeux ? profile.voeux : voeux)
  const [submit, setSubmit] = React.useState(profile.voeux ? true : false)
  const history = useHistory()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleClick = (index, val) => {
    const newVal = [...values]
    newVal[index].choice = val
    setValues(newVal)
    if (values.filter((x) => x.choice !== undefined).length === values.length && submit === false) {
      setSubmit(!submit)
    }
  }

  const handleSubmit = () => {
    updateUser({ voeux: values })
    history.push('/step-three')
  }

  return (
    <Col>
      <StepTitle>Etape 2/6 - Vos voeux</StepTitle>
      <ChatBubble>J'ai récupéré votre liste de voeux</ChatBubble>
      <p>Pour quels voeux voulez-vous transmettre votre profil à des employeurs ?</p>
      {values.map((voeu, index) => {
        return (
          <div key={index}>
            <VoeuTitle number={index + 1} key={index} title={voeu.formation} />
            <div className='d-md-flex justify-content-between'>
              <RadioButton onClick={() => handleClick(index, true)} state={voeu.choice === true ? true : null}>
                Oui
              </RadioButton>
              <div className='p-1'></div>
              <RadioButton onClick={() => handleClick(index, false)} state={voeu.choice === false ? false : null}>
                Non
              </RadioButton>
            </div>
          </div>
        )
      })}
      <div className='d-flex justify-content-between mb-5'>
        <Link to='/step-one'>
          <PreviousButton className='gtm-previousbutton-steptwo' />
        </Link>
        <NextButton
          onClick={() => handleSubmit()}
          disabled={!(submit && (submit || profile.voeux)) || !submit}
          className='gtm-nextbutton-steptwo'
        />
      </div>
    </Col>
  )
}
