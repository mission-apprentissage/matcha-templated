import React from 'react'
import { useHistory } from 'react-router-dom'
import { DropdownCombobox, Input } from '../../components'
import { Col, Form } from 'react-bootstrap'
import { StepTitle, ChatBubble, QuestionTitle, NextButton, Button, InputTitle, RemoveLink } from '../../components'
import { Context } from '../../context'
import { v4 as uuid } from 'uuid'

const Step = (props) => {
  const {
    index,
    niveau,
    metier,
    formation,
    etablissement,
    handleValues,
    inputJobItems,
    handleJobSearch,
    setInputJobItems,
    handleRemoveExperience,
  } = props
  return (
    <>
      {index > 0 && (
        <div className='d-flex justify-content-between'>
          <InputTitle bold={true}>Projet {index + 1}</InputTitle>
          <RemoveLink onClick={() => handleRemoveExperience(index)}>Supprimer</RemoveLink>
        </div>
      )}
      <p>Dans quelle formation êtes-vous inscrit ou acez-vous l'intention de vous inscrire ?</p>
      <QuestionTitle title='Niveau de la formation' />
      <Form.Group controlId='exampleForm.ControlSelect1'>
        <Form.Control value={niveau} onChange={(e) => handleValues('niveau', e.target.value, index)} as='select'>
          <option disabled selected value></option>
          <option value='3'>CAP, BEP</option>
          <option value='4'>Baccalauréat</option>
          <option value='5'>DEUG, BTS, DUT, DEUST</option>
          <option value='6'>License, License professionnelle</option>
          <option value='6'>Maitrise, master 1</option>
          <option value='7'>Master 2, DEA, DESS, Ingénieur</option>
          <option value='8'>Doctorat, recherche</option>
        </Form.Control>
      </Form.Group>
      <QuestionTitle title='Intitulé de la formation' />
      <Input
        placeholder='ex: boulanger, chef de projet digital, ... '
        value={formation}
        onChange={(e) => handleValues('formation', e.target.value, index)}
      />
      <QuestionTitle title='Dans quel centre de formation suivez-vous ou avez-vous l’intention de suivre cette formation ?' />
      <Input
        placeholder='ex: CFA de Massy, UIMM ...'
        value={etablissement}
        onChange={(e) => handleValues('etablissement', e.target.value, index)}
      />
      <QuestionTitle title='Sur quel métier cherchez-vous un contrat d’apprentissage en lien avec cette formation ?' />
      <DropdownCombobox
        handleSearch={handleJobSearch}
        inputItems={inputJobItems}
        setInputItems={setInputJobItems}
        saveSelectedItem={handleValues}
        valueName='metier'
        index={index}
        value={metier && metier.label}
      />
    </>
  )
}

export default () => {
  const { addItem, check, saveContext, profile } = React.useContext(Context)
  const [inputJobItems, setInputJobItems] = React.useState([])
  const [stepState, setStepState] = React.useState(profile.voeux ? profile.voeux : [{}])
  const [submit, setSubmit] = React.useState(false)

  const history = useHistory()
  const questionnaireId = uuid()

  const handleJobSearch = async (search) => {
    if (search) {
      const result = await fetch(`https://idea-mna-api.herokuapp.com/romelabels?title=${search}`)
      const data = await result.json()
      return data.labelsAndRomes
    }
    return inputJobItems
  }

  const handleValues = (name, value, index) => {
    const copy = [...stepState]
    copy[index][`${name}`] = value
    if (copy[index][`${name}`] === '') {
      copy[index][`${name}`] = undefined
    }
    setStepState(copy)
    check(stepState, setSubmit, ['formation', 'metier', 'etablissement', 'niveau'])
  }

  const handleRemoveExperience = (index) => {
    const copy = [...stepState]
    copy.splice(index, 1)
    setStepState(copy)
  }

  return (
    <Col>
      <StepTitle>Etape 1/6 - Votre recherche </StepTitle>
      <ChatBubble>Quel est votre projet ? Je chercherai des entreprises qui y correspondent !</ChatBubble>
      {stepState.map((item, index) => (
        <Step
          {...item}
          key={index}
          index={index}
          handleValues={handleValues}
          inputJobItems={inputJobItems}
          handleJobSearch={handleJobSearch}
          setInputJobItems={setInputJobItems}
          handleRemoveExperience={handleRemoveExperience}
        />
      ))}
      <Button experience='true' onClick={() => addItem(stepState, setStepState)}>
        + Ajouter une expérience
      </Button>
      <div className='d-flex justify-content-end mb-5'>
        <NextButton
          onClick={() => saveContext(history, 'voeux', stepState, '/step-two', questionnaireId)}
          disabled={!submit}
        />
      </div>
    </Col>
  )
}
