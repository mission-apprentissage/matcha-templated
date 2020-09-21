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
    tasks,
    companyName,
    companyAddress,
    startDate,
    endDate,
    number,
    handleChange,
    handleInputChange,
    index,
    profile,
  } = props
  const [state, setState] = React.useState({})
  const [inputState, setInputState] = React.useState(false)
  const [minDate, setMinDate] = React.useState('')

  const handleTag = (event) => {
    const val = event.target.value
    if (state.task) {
      if (state.task.length === 3) {
        handleChange('tasks', state.task, index)
        setInputState(true)
      } else {
        setInputState(false)
      }
    }
    if (event.keyCode === 13) {
      if (state.task) {
        const copy = [...state.task]
        copy.push(val)
        setState({ task: copy })
      } else {
        setState({ task: [val] })
      }
      event.target.value = ''
    }
  }

  const handleRemoveTag = (i) => {
    const copy = [...state.task]
    copy.splice(i, 1)
    setInputState(false)
    setState({ task: copy })
  }

  console.log('inputstate', inputState, state.task ? state.task.length : '')

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
      />
      {/* handleInputChange not working */}
      {/* <Input placeholder="animateur, cueillette, garde d'enfant, ..." required type="text" onChange={handleInputChange} name="name" value={name} /> */}
      <QuestionTitle title='Vos 3 principales missions ou tâches ?' />
      <div className='pb-1'>
        {state.task &&
          state.task.map((x, i) => (
            <Tag key={i} onClick={() => handleRemoveTag(i)}>
              {x}
            </Tag>
          ))}
      </div>
      <Input
        placeholder='entre un mot-clé'
        required
        type='text'
        onChange={handleTag}
        onKeyDown={handleTag}
        disabled={inputState}
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
      />
      <Autocomplete
        title="Adresse de l'entreprise"
        context={companyAddress && companyAddress}
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
            onChange={(event) => handleChange('endDate', event.target.value, index)}
            min={minDate ? minDate : ''}
          />
        </div>
      </div>
    </>
  )
}

const stepTemplate = {
  name: undefined,
  tasks: undefined,
  companyName: undefined,
  companyAddress: undefined,
  startDate: undefined,
  endDate: undefined,
}

export default () => {
  const { updateUser, profile } = React.useContext(Context)
  const history = useHistory()
  const [stepState, setStepState] = React.useState(profile.experience ? profile.experience : [stepTemplate])
  const [currentStepState, setCurrentStepState] = React.useState()
  const [submit, setSubmit] = React.useState(false)

  const handleChange = (name, value, index) => {
    const currentStepState = stepState[index]
    currentStepState[`${name}`] = value
    setCurrentStepState({ currentStepState })
    if (Object.values(stepState[0]).every((x) => x !== '')) {
      setSubmit(true)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    console.log(name, value)
    setCurrentStepState({ ...currentStepState, [name]: value })
  }

  const addStep = () => {
    const copy = [...stepState]
    copy.push(stepTemplate)
    setStepState([...stepState, copy])
  }

  const handleSubmit = () => {
    updateUser({ experiences: stepState })
    history.push('/step-five')
  }

  return (
    <Col>
      {stepState.map((item, key) => (
        <Step
          key={key}
          index={key}
          number={key + 1}
          {...item}
          handleChange={handleChange}
          handleInputChange={handleInputChange}
        />
      ))}
      <hr />
      <Button experience='true' onClick={() => addStep()}>
        + Ajouter une expérience
      </Button>
      <div className='d-flex justify-content-between'>
        <Link to='/step-three'>
          <PreviousButton />
        </Link>
        <Link to='step-five'>
          <NextButton onClick={() => handleSubmit()} disabled={!submit} />
        </Link>
      </div>
    </Col>
  )
}
