import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import { Context } from '../../context'
import {
  Button,
  Input,
  InputTitle,
  StepTitle,
  ChatBubble,
  NextButton,
  PreviousButton,
  QuestionTitle,
  CheckButton,
  Tag,
  RemoveLink,
  RadioButton,
} from '../../components'

const criteria = [
  'Pratiquer une activité sportive',
  'Travailler dehors',
  'Travailler en contact avec la nature, avec des animaux',
  'Me déplacer souvent, intervenir sur le terrain',
  'Avoir le goût du risque',
  'Défendre, secourir, protéger',
  "Travailler à l'étranger, voyager",
  'Concevoir, fabriquer, construire',
  'Maîtriser les technologies nouvelles, innover',
  'Faire fonctionner',
  'Faire un travail minutieux précis',
  'Travailler un matériau',
  'Exercer une activité artistique ou créative',
  'Aimer écrire, rédiger',
  'Pratiquer les langues vivantes',
  'Diriger, manager, décider',
  'Entreprendre',
  'Convaincre, négocier',
  'Faire du commerce, acheter, vendre',
  'Manier les chiffres, les données',
  'Organiser, planifier, gérer',
  "Rechercher, traiter, analyser l'information",
  'Enseigner, former, transmettre',
  'Informer, communiquer',
  'Chercher, comprendre, expérimenter',
  'Aider, conseiller, accompagner',
  "M'occuper des personnes dépendantes",
  'Soigner',
  "Travailler auprès d'enfants",
]

const Step = (props) => {
  const { index, periodicity, activityName, criteria, handleChange, handleRemoveTag, handleRemoveActivity } = props
  return (
    <Col>
      {index > 0 && (
        <div className='d-flex justify-content-between'>
          <InputTitle bold={true}>Activité {index + 1}</InputTitle>
          <RemoveLink onClick={() => handleRemoveActivity(index)}>Supprimer</RemoveLink>
        </div>
      )}
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
              <RadioButton
                state={periodicity === x ? true : null}
                key={i}
                onClick={() => handleChange('periodicity', x, index)}
              >
                {x}
              </RadioButton>
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
    </Col>
  )
}

export default () => {
  const { profile, check, addItem, saveData } = React.useContext(Context)
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

  const handleRemoveActivity = (index) => {
    const copy = [...stepState]
    copy.splice(index, 1)
    setStepState(copy)
  }

  return (
    <Col>
      <StepTitle>Etape 5/6 - Vos activités </StepTitle>
      {stepState.map((item, key) => (
        <Step
          key={key}
          index={key}
          handleChange={handleChange}
          handleRemoveTag={handleRemoveTag}
          handleRemoveActivity={handleRemoveActivity}
          {...item}
        />
      ))}
      <Button experience='true' onClick={() => addItem(stepState, setStepState)}>
        + Ajouter une activité
      </Button>
      <div className='d-flex justify-content-between mb-5'>
        <Link to='step-four'>
          <PreviousButton />
        </Link>
        <NextButton onClick={() => saveData(history, 'activities', stepState, '/step-six')} disabled={!submit} />
      </div>
    </Col>
  )
}
