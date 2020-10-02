import React from 'react'
import { Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import color from '../../components/helper/color'

import {
  Button,
  Input,
  InputTitle,
  StepTitle,
  ChatBubble,
  NextButton,
  PreviousButton,
  QuestionTitle,
  Tag,
  Autocomplete,
  RemoveLink,
} from '../../components'
import { Context } from '../../context'

const Wrapper = styled.div`
  ${(props) =>
    props.index % 2 === 0 &&
    `
    // background: ${color.veryLightGrey}
  `}
`

const Step = (props) => {
  const {
    nom,
    taches,
    nomEntreprise,
    adresseEntreprise,
    dateDebut,
    dateFin,
    handleChange,
    handleRemoveTag,
    handleRemoveExperience,
    index,
  } = props
  const [minDate, setMinDate] = React.useState('')

  return (
    <Wrapper index={index}>
      {index > 0 && (
        <div className='d-flex justify-content-between'>
          <InputTitle bold={true}>Expérience {index + 1}</InputTitle>
          <RemoveLink onClick={() => handleRemoveExperience(index)}>Supprimer</RemoveLink>
        </div>
      )}
      <ChatBubble>
        Décrivez moi toute expérience avec le monde du travail, qui vous a demandé d’apprendre, de progresser, des
        responsabilités ou dont vous êtes fière.
      </ChatBubble>
      <QuestionTitle title='Votre expérience' />
      <Input
        placeholder="animateur, cueillette, garde d'enfant, ..."
        required
        type='text'
        onChange={(e) => handleChange('nom', e.target.value, index)}
        value={nom}
      />
      <QuestionTitle title='Vos 3 principales missions ou tâches ?' />
      <div className='pb-1'>
        {taches &&
          taches.map((x, i) => (
            <Tag key={i} onClick={() => handleRemoveTag(index, i)}>
              {x}
            </Tag>
          ))}
      </div>
      <Input
        placeholder='entre un mot-clé'
        required
        type='text'
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleChange('taches', e.target.value, index, true)
            e.target.value = ''
          }
        }}
        disabled={taches && taches.length === 3}
      />
      <ChatBubble>
        Les employeurs portent de l’attention à cette information. Aller au plus simple en utilisant des verbes d’action
        comme par exemple : ranger les rayons, préparer les plans de travail, organiser les activités du groupe, ...
      </ChatBubble>
      <QuestionTitle title='Dans quelle structure ou entreprise ?' />
      <InputTitle>Nom de l'entreprise</InputTitle>
      <Input
        placeholder="entrez le nom de l'entreprise"
        onChange={(e) => handleChange('nomEntreprise', e.target.value, index)}
        value={nomEntreprise}
      />
      <Autocomplete
        title="Adresse de l'entreprise"
        context={adresseEntreprise}
        placeholder="entrez l'adresse de l'entreprise"
        handleValues={handleChange}
        index={index}
        fullAddress={true}
      />
      <QuestionTitle title='Sur quelle période ?' />
      <div className='row p-0'>
        <div className='col'>
          <InputTitle>Date de début</InputTitle>
          <Input
            placeholder='sélectionne une date de début'
            required
            value={dateDebut}
            type='date'
            onChange={(event) => {
              handleChange('dateDebut', event.target.value, index)
              setMinDate(event.target.value)
            }}
          />
        </div>
        <div className='col'>
          <InputTitle>Date de fin</InputTitle>
          <Input
            placeholder='sélectionne une date de fin'
            required
            type='date'
            value={dateFin}
            onChange={(event) => handleChange('dateFin', event.target.value, index)}
            min={minDate ? minDate : ''}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default () => {
  const { profile, addItem, saveContext, check } = React.useContext(Context)
  const history = useHistory()
  const [stepState, setStepState] = React.useState(profile.experiences ? profile.experiences : [{}])
  const [submit, setSubmit] = React.useState(false)

  const handleChange = (name, value, index, tag) => {
    const copy = [...stepState]
    if (tag) {
      if (!copy[index].taches) {
        copy[index].taches = [value]
      } else {
        copy[index].taches.push(value)
      }
    } else {
      copy[index][`${name}`] = value
      if (copy[index][`${name}`] === '') {
        copy[index][`${name}`] = undefined
      }
    }
    setStepState(copy)
    check(stepState, setSubmit, ['nom', 'taches', 'nomEntreprise', 'adresseEntreprise', 'dateDebut', 'dateFin'])
  }

  const handleRemoveTag = (index, tagIndex) => {
    const copy = [...stepState]
    copy[index].task.splice(tagIndex, 1)
    if (copy[index].task.length === 0) {
      copy[index].task = undefined
    }
    setStepState(copy)
    check(stepState, setSubmit, ['nom', 'taches', 'nomEntreprise', 'adresseEntreprise', 'dateDebut', 'dateFin'])
  }

  const handleRemoveExperience = (index) => {
    const copy = [...stepState]
    copy.splice(index, 1)
    setStepState(copy)
  }

  return (
    <Col>
      <StepTitle>Etape 4/6 - Vos expériences</StepTitle>
      {stepState.map((item, key) => (
        <Step
          key={key}
          index={key}
          handleChange={handleChange}
          handleRemoveTag={handleRemoveTag}
          handleRemoveExperience={handleRemoveExperience}
          {...item}
        />
      ))}
      <hr />
      <Button experience='true' onClick={() => addItem(stepState, setStepState)}>
        + Ajouter une expérience
      </Button>
      <div className='d-flex justify-content-between mb-5'>
        <Link to='/step-three'>
          <PreviousButton />
        </Link>
        <Link to='step-five'>
          <NextButton onClick={() => saveContext(history, 'experiences', stepState, '/step-five')} disabled={!submit} />
        </Link>
      </div>
    </Col>
  )
}
