import React from 'react'
import { Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import {
  Input,
  InputTitle,
  StepTitle,
  ChatBubble,
  NextButton,
  Button,
  RemoveLink,
  PreviousButton,
} from '../../components'
import { Context } from '../../context'

const Formulaire = (props) => {
  const { firstname, lastname, role, phone, email, handleChange, handleRemoveContact, index } = props
  return (
    <Col>
      {index > 0 && (
        <div className='d-flex justify-content-between'>
          <InputTitle bold={true}>Contact {index + 1}</InputTitle>
          <RemoveLink onClick={() => handleRemoveContact(index)}>Supprimer</RemoveLink>
        </div>
      )}
      <InputTitle>Prénom</InputTitle>
      <Input type='text' value={firstname} onChange={(event) => handleChange('firstname', event.target.value, index)} />
      <InputTitle>Nom</InputTitle>
      <Input type='text' value={lastname} onChange={(event) => handleChange('lastname', event.target.value, index)} />
      <InputTitle>Rôle dans la structure / l'entreprise</InputTitle>
      <Input type='text' value={role} onChange={(event) => handleChange('role', event.target.value, index)} />
      <InputTitle>Téléphone</InputTitle>
      <Input type='tel' value={phone} onChange={(event) => handleChange('phone', event.target.value, index)} />
      <InputTitle>Courriel</InputTitle>
      <Input type='email' value={email} onChange={(event) => handleChange('email', event.target.value, index)} />
    </Col>
  )
}

export default () => {
  const { profile, addItem, saveData } = React.useContext(Context)
  const [contactState, setContactState] = React.useState([{}])
  const history = useHistory()

  const handleChange = (name, value, index) => {
    const copy = [...contactState]
    copy[index][`${name}`] = value
    if (copy[index][`${name}`] === '') {
      copy[index][`${name}`] = undefined
    }
    setContactState(copy)
  }
  const handleRemoveContact = (index) => {
    const copy = [...contactState]
    copy.splice(index, 1)
    setContactState(copy)
  }
  return (
    <Col>
      <StepTitle>Etape 6/6 - Recommandations</StepTitle>
      <ChatBubble>
        Pour terminer, les employeurs sont sensibles aux recommandations, avez-vous des contacts d'anciens employeurs ou
        maîtres de stages qui pourraient parler de vous à leur communiquer ?
      </ChatBubble>
      {contactState.map((item, index) => (
        <Formulaire index={index} handleChange={handleChange} handleRemoveContact={handleRemoveContact} {...item} />
      ))}
      <Button experience='true' onClick={() => addItem(contactState, setContactState)}>
        + Ajouter un contact
      </Button>
      <div className='d-flex justify-content-between mb-5'>
        <Link to='step-five'>
          <PreviousButton />
        </Link>
        <NextButton onClick={() => saveData(history, 'recommandations', contactState, '/final')} />
      </div>
    </Col>
  )
}
