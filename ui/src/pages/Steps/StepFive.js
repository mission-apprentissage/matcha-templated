import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import {
  Button,
  Input,
  StepTitle,
  ChatBubble,
  NextButton,
  PreviousButton,
  QuestionTitle,
  CheckButton,
  Tag,
} from '../../components'
import { Context } from '../../context'

const frequence = [
  'Tous les jours',
  'Plusieurs fois par semaine',
  'Plusieurs fois par mois',
  "Moins d'une fois par mois",
]

const stepTemplate = {
  activityName: undefined,
  periodicity: undefined,
  criteria: undefined,
}

const Step = (props) => {
  const { number, handleChange, index } = props
  const [inputState, setInputState] = React.useState(false)
  const [state, setState] = React.useState({})

  const handleTag = (event) => {
    const val = event.target.value
    if (state.task) {
      if (state.task.length === 3) {
        console.log('setting true')
        handleChange('criteria', state.task, index)
        setInputState(true)
      } else {
        console.log('setting false')
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
    setState({ task: copy })
  }

  return (
    <Col>
      <StepTitle>Etape 5/6 - Vos activités ({number})</StepTitle>
      <ChatBubble>
        Vous avez sûrement encore des compétences à mettre en valeur liées à vos activités et/ou centres d’intérêts !
      </ChatBubble>
      <QuestionTitle title="Votre activité ou centre d'intérêt" />
      <Input
        placeholder='blogging, bénévolat, football, ...'
        required
        type='text'
        onChange={(event) => handleChange('activityName', event.target.value, index)}
      />
      <QuestionTitle title='A quelle fréquence pratiquez-vous cette activité' />
      <Row>
        {frequence.map((x, i) => {
          return <CheckButton btn={x} key={i} onClick={() => handleChange('periodicity', x, index)} />
        })}
      </Row>
      <QuestionTitle title="Qu'est ce qui vous plait le plus dans cette activité (3 critères maximum) ?" />
      <div className='pb-1'>
        {state.task &&
          state.task.map((x, i) => (
            <Tag key={i} onClick={() => handleRemoveTag(i)}>
              {x}
            </Tag>
          ))}
      </div>
      <Input placeholder='selectionner un critère' onChange={handleTag} onKeyDown={handleTag} disabled={inputState} />
      <hr />
    </Col>
  )
}

export default () => {
  const { updateUser } = React.useContext(Context)
  const history = useHistory()
  const [stepState, setStepState] = React.useState([stepTemplate])
  const [currentStepState, setCurrentStepState] = React.useState()
  const [submit, setSubmit] = React.useState(false)

  const handleChange = (name, value, index) => {
    const currentStepState = stepState[index]
    currentStepState[`${name}`] = value
    setCurrentStepState({ currentStepState })
    if (Object.values(stepState[0]).every((x) => x !== undefined)) {
      setSubmit(true)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    console.log(name, value)
    // setValues({ ...stepValues, [name]: value })
  }

  console.log(Object.values(stepState[0]))

  const addStep = () => {
    const copy = [...stepState]
    copy.push(stepTemplate)
    setStepState(copy)
  }

  const handleSubmit = () => {
    updateUser({ activities: stepState })
    history.push('/step-six')
  }

  return (
    <Col>
      {stepState.map((item, key) => (
        <Step
          key={key}
          number={key + 1}
          index={key}
          {...item}
          handleChange={handleChange}
          handleInputChange={handleInputChange}
        />
      ))}
      <Button experience='true' onClick={() => addStep()}>
        + Ajouter une expérience
      </Button>
      <div className='d-flex justify-content-between'>
        <Link to='step-four'>
          <PreviousButton />
        </Link>

        <NextButton onClick={() => handleSubmit()} disabled={!submit} />
      </div>
    </Col>
  )
}
