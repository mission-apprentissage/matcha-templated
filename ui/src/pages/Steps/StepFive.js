import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useCombobox, useMultipleSelection } from 'downshift'
import styled from 'styled-components'
import color from '../../components/helper/color'

import { Context } from '../../context'
import {
  Button,
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

const Wrapper = styled.ul`
  width: 95%;
  margin: 0;
  padding: 0;
  z-index: 1;
  position: absolute;
  list-style: none;
  background: #fff;
  overflow: auto;
  box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.24);
  border-radius: 4px;
  li {
    width: 100%;
    padding: 0.5rem;
  }
  li[data-focus='true'] {
    background: ${color.lightGrey};
    /* background: ${color.grey}; */
    /* color: white; */
  }
`

const Input = styled.input`
  border: 1px solid ${color.grey};
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Inter;
  font-size: 1rem;
  padding-left: 10px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 0.5rem;
  width: 100%;
  outline: none;
  border: 1px solid ${color.middleGrey};
  ${(props) =>
    props.value &&
    `
    border: 1px solid ${color.black};
  `}
  ::placeholder {
    color: #98b0b7;
  }
  :hover {
    border: 1px solid ${color.red};
  }
  :focus {
    border: 1px solid ${color.red};
    background: ${color.white} !important;
  }
  :disabled {
    border: 1px solid ${color.lightGrey};
    background: ${color.lightGrey};
  }
`

const MultiSelect = () => {
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

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    inputValue,
    items: getFilteredItems(criteria),
    onStateChange: ({ inputValue, type, selectedItem }) => {
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
            selectItem(null)
          }
          break
        default:
          break
      }
    },
  })
  return (
    <div>
      <div>
        {selectedItems.map((selectedItem, index) => (
          <Tag
            key={`selected-item-${index}`}
            onClick={() => removeSelectedItem(selectedItem)}
            {...getSelectedItemProps({ selectedItem, index })}
          >
            {selectedItem}
          </Tag>
        ))}
        <div {...getComboboxProps()}>
          <Input
            placeholder='selectionner un critère'
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            disabled={selectedItems && selectedItems.length === 3}
          />
        </div>
      </div>
      <Wrapper {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(criteria).map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: color.lightGrey } : {}}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </Wrapper>
    </div>
  )
}

const Step = (props) => {
  const {
    index,
    periodicity,
    activityName,
    criteria,
    handleChange,
    handleRemoveTag,
    handleRemoveActivity,
    handleSearch,
  } = props
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
      <MultiSelect />
      {/* <Input
        placeholder='ajouter un critère'
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleChange('task', e.target.value, index, true)
            e.target.value = ''
          }
        }}
        disabled={criteria && criteria.length === 3}
      /> */}
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

  const handleSearch = (search) => {}

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
          <PreviousButton />
        </Link>
        <NextButton onClick={() => saveData(history, 'activities', stepState, '/step-six')} disabled={!submit} />
      </div>
    </Col>
  )
}
