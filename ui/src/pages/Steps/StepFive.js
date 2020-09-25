import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../../context'
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

const Step = (props) => {
  const { number, handleChange, index, periodicity, activityName, criteria, handleRemoveTag } = props
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
        value={activityName}
        onChange={(event) => handleChange('activityName', event.target.value, index)}
      />
      <QuestionTitle title='A quelle fréquence pratiquez-vous cette activité' />
      <Row>
        {['Tous les jours', 'Plusieurs fois par semaine', 'Plusieurs fois par mois', "Moins d'une fois par mois"].map(
          (x, i) => {
            return (
              <CheckButton
                state={periodicity === x ? true : null}
                btn={x}
                key={i}
                onClick={() => handleChange('periodicity', x, index)}
              />
            )
          }
        )}
      </Row>
      <QuestionTitle title="Qu'est ce qui vous plait le plus dans cette activité (3 critères maximum) ?" />
      <div className='pb-1'>
        {criteria &&
          criteria.map((x, i) => (
            <Tag key={i} onClick={() => handleRemoveTag(index, i)}>
              {x}
            </Tag>
          ))}
      </div>
      <Input
        placeholder='ajouter un critère'
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleChange('task', e.target.value, index, true)
            e.target.value = ''
          }
        }}
        disabled={criteria && criteria.length === 3}
      />
      <hr />
    </Col>
  )
}

export default () => {
  const { profile, check, addStep, saveData } = React.useContext(Context)
  const history = useHistory()
  const [stepState, setStepState] = React.useState(profile.activities ? profile.activities : [{}])
  const [submit, setSubmit] = React.useState(false)

  const handleChange = (name, value, index, tag) => {
    const copy = [...stepState]
    if (tag) {
      if (!copy[index].criteria) {
        copy[index].criteria = [value]
      } else {
        copy[index].criteria.push(value)
      }
    } else {
      copy[index][`${name}`] = value
      if (copy[index][`${name}`] === '') {
        copy[index][`${name}`] = undefined
      }
    }
    setStepState(copy)
    check(stepState, setSubmit, ['activityName', 'periodicity', 'criteria'])
  }

  const handleRemoveTag = (index, tagIndex) => {
    const copy = [...stepState]
    copy[index].criteria.splice(tagIndex, 1)
    if (copy[index].criteria.length === 0) {
      copy[index].criteria = undefined
    }
    setStepState(copy)
    check(stepState, setSubmit, ['activityName', 'periodicity', 'criteria'])
  }

  return (
    <Col>
      {stepState.map((item, key) => (
        <Step
          key={key}
          number={key + 1}
          index={key}
          handleChange={handleChange}
          handleRemoveTag={handleRemoveTag}
          {...item}
        />
      ))}
      <Button experience='true' onClick={() => addStep(stepState, setStepState)}>
        + Ajouter une activité
      </Button>
      <div className='d-flex justify-content-between'>
        <Link to='step-four'>
          <PreviousButton />
        </Link>
        <NextButton onClick={() => saveData(history, 'activities', stepState, '/step-six')} disabled={!submit} />
      </div>
    </Col>
  )
}
