import React from 'react'
import { Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

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
} from '../../components'
import { Context } from '../../context'

const Step = (props) => {
  const {
    name,
    task,
    companyName,
    companyAddress,
    startDate,
    endDate,
    number,
    handleChange,
    handleRemoveTag,
    index,
    profile,
  } = props
  const [minDate, setMinDate] = React.useState('')

  return (
    <>
      <StepTitle>Etape 4/6 - Vos expériences ({number})</StepTitle>
      <ChatBubble>
        Décrivez moi toute expérience avec le monde du travail, qui vous a demandé d’apprendre, de progresser, des
        responsabilités ou dont vous êtes fière.
      </ChatBubble>
      <QuestionTitle title='Votre expérience' />
      <Input
        placeholder="animateur, cueillette, garde d'enfant, ..."
        required
        type='text'
        onChange={(e) => handleChange('name', e.target.value, index)}
        value={name}
      />
      <QuestionTitle title='Vos 3 principales missions ou tâches ?' />
      <div className='pb-1'>
        {task &&
          task.map((x, i) => (
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
            handleChange('task', e.target.value, index, true)
            e.target.value = ''
          }
        }}
        disabled={task && task.length === 3}
      />
      <ChatBubble>
        Les employeurs portent de l’attention à cette information. Aller au plus simple en utilisant des verbes d’action
        comme par exemple : ranger les rayons, préparer les plans de travail, organiser les activités du groupe, ...
      </ChatBubble>
      <QuestionTitle title='Dans quelle structure ou entreprise ?' />
      <InputTitle>Nom de l'entreprise</InputTitle>
      <Input
        placeholder="entrez le nom de l'entreprise"
        onChange={(e) => handleChange('companyName', e.target.value, index)}
        value={companyName}
      />
      <Autocomplete
        title="Adresse de l'entreprise"
        context={companyAddress}
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
            value={startDate}
            type='date'
            onChange={(event) => {
              handleChange('startDate', event.target.value, index)
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
            value={endDate}
            onChange={(event) => handleChange('endDate', event.target.value, index)}
            min={minDate ? minDate : ''}
          />
        </div>
      </div>
    </>
  )
}

export default () => {
  const { profile, addStep, saveData, check } = React.useContext(Context)
  const history = useHistory()
  const [stepState, setStepState] = React.useState(profile.experiences ? profile.experiences : [{}])
  const [submit, setSubmit] = React.useState(false)

  const handleChange = (name, value, index, tag) => {
    const copy = [...stepState]
    if (tag) {
      if (!copy[index].task) {
        copy[index].task = [value]
      } else {
        copy[index].task.push(value)
      }
    } else {
      copy[index][`${name}`] = value
      if (copy[index][`${name}`] === '') {
        copy[index][`${name}`] = undefined
      }
    }
    setStepState(copy)
    check(stepState, setSubmit, ['name', 'task', 'companyName', 'companyAddress', 'startDate', 'endDate'])
  }

  const handleRemoveTag = (index, tagIndex) => {
    const copy = [...stepState]
    copy[index].task.splice(tagIndex, 1)
    if (copy[index].task.length === 0) {
      copy[index].task = undefined
    }
    setStepState(copy)
    check(stepState, setSubmit, ['name', 'task', 'companyName', 'companyAddress', 'startDate', 'endDate'])
  }

  return (
    <Col>
      {stepState.map((item, key) => (
        <Step
          key={key}
          index={key}
          number={key + 1}
          handleChange={handleChange}
          handleRemoveTag={handleRemoveTag}
          {...item}
        />
      ))}
      <hr />
      <Button experience='true' onClick={() => addStep(stepState, setStepState)}>
        + Ajouter une expérience
      </Button>
      <div className='d-flex justify-content-between'>
        <Link to='/step-three'>
          <PreviousButton />
        </Link>
        <Link to='step-five'>
          <NextButton onClick={() => saveData(history, 'experiences', stepState, '/step-five')} disabled={!submit} />
        </Link>
      </div>
    </Col>
  )
}
