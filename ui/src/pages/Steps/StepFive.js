import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useCombobox, useMultipleSelection } from 'downshift'
import styled from 'styled-components'
import color from '../../components/helper/color'

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
  Tag,
  RemoveLink,
  RadioButton,
} from '../../components'

const criteres = [
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

const Container = styled.div`
  margin-bottom: 2rem;
`
const Wrapper = styled.ul`
  width: 94%;
  max-height: 200px;
  margin: 0;
  padding: 0;
  z-index: 1;
  position: absolute;
  list-style: none;
  background: #fff;
  overflow: auto;
  box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.24);
  border-radius: 4px;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${color.middleGrey};
  }
  li {
    width: 100%;
    padding: 0.5rem;
  }
`

const MultiSelect = ({ handleChange, handleRemoveTag, state, index }) => {
  const [inputValue, setInputValue] = React.useState('')
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({})

  const getFilteredItems = (items) =>
    items.filter((item) => selectedItems.indexOf(item) < 0 && item.toLowerCase().startsWith(inputValue.toLowerCase()))

  const onStateChange = ({ inputValue, type, selectedItem }) => {
    switch (type) {
      case useCombobox.stateChangeTypes.InputChange:
        setInputValue(inputValue)
        break
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputBlur:
        if (selectedItem) {
          setInputValue('')
          addSelectedItem(selectedItem)
          handleChange('criteres', selectedItem, index, true)
          selectItem(null)
        }
        break
      default:
        break
    }
  }
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    inputValue,
    onStateChange,
    items: getFilteredItems(criteres),
  })
  return (
    <Container>
      <div>
        {/* {selectedItems.map((selectedItem, i) => (
          <Tag
            key={`selected-item-${i}`}
            onClick={() => {
              handleRemoveTag(index, i)
              removeSelectedItem(selectedItem)
            }}
            {...getSelectedItemProps({ selectedItem, i })}
          >
            {selectedItem}
          </Tag>
        ))} */}
        <div {...getComboboxProps()}>
          <Input
            suggestion={true}
            placeholder='selectionner un critère'
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            {...getToggleButtonProps()}
            disabled={state && state.length === 3}
          />
        </div>
      </div>
      <Wrapper {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(criteres).map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: color.lightGrey } : {}}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </Wrapper>
    </Container>
  )
}

const Step = (props) => {
  const { index, periodicite, nom, criteres, handleChange, handleRemoveTag, handleRemoveActivity } = props
  return (
    <Col className='mt-3 mb-3'>
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
        value={nom}
        onChange={(event) => handleChange('nom', event.target.value, index)}
      />
      <QuestionTitle title='A quelle fréquence pratiquez-vous cette activité' />
      <Row style={{ marginBottom: '2rem' }}>
        {['Tous les jours', 'Plusieurs fois par semaine', 'Plusieurs fois par mois', "Moins d'une fois par mois"].map(
          (x, i) => {
            return (
              <RadioButton
                state={periodicite === x ? true : null}
                key={i}
                onClick={() => handleChange('periodicite', x, index)}
              >
                {x}
              </RadioButton>
            )
          }
        )}
      </Row>
      <QuestionTitle title="Qu'est ce qui vous plait le plus dans cette activité (3 critères maximum) ?" />
      <div className='pb-1'>
        {criteres &&
          criteres.map((critere, i) => (
            <Tag key={i} onClick={() => handleRemoveTag(index, i)}>
              {critere}
            </Tag>
          ))}
      </div>
      <MultiSelect handleChange={handleChange} index={index} handleRemoveTag={handleRemoveTag} state={criteres} />
    </Col>
  )
}

export default () => {
  const { profile, check, addItem, saveContext } = React.useContext(Context)
  const history = useHistory()
  const [stepState, setStepState] = React.useState(profile.activites ? profile.activites : [{}])
  const [submit, setSubmit] = React.useState(false)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (name, value, index, tag) => {
    const copy = [...stepState]
    if (tag) {
      if (!copy[index].criteres) {
        copy[index].criteres = [value]
      } else {
        copy[index].criteres.push(value)
      }
    } else {
      copy[index][`${name}`] = value
      if (copy[index][`${name}`] === '') {
        copy[index][`${name}`] = undefined
      }
    }
    setStepState(copy)
    check(stepState, setSubmit, ['nom', 'periodicite', 'criteres'])
  }

  const handleRemoveTag = (index, tagIndex) => {
    const copy = [...stepState]
    copy[index].criteres.splice(tagIndex, 1)
    if (copy[index].criteres.length === 0) {
      copy[index].criteres = undefined
    }
    setStepState(copy)
    check(stepState, setSubmit, ['nom', 'periodicite', 'criteres'])
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
      <Button className='mt-3' experience='true' onClick={() => addItem(stepState, setStepState)}>
        + Ajouter une activité
      </Button>
      <div className='d-flex justify-content-between mb-5'>
        <Link to='step-four'>
          <PreviousButton className='gtm-previousbutton-stepfive' />
        </Link>
        <NextButton
          onClick={() => saveContext(history, 'activites', stepState, '/step-six')}
          disabled={!submit}
          className='gtm-nextbutton-stepfive'
        />
      </div>
    </Col>
  )
}
