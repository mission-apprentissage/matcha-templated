import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import color from '../../components/helper/color'
import MomentUtils from '@date-io/moment'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import moment from 'moment'
import 'moment/locale/fr'
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
import styled from 'styled-components'

const datePickerTheme = createMuiTheme({
  palette: {
    primary: { main: color.redLight },
  },
  overrides: {
    MuiTextField: {
      root: {
        width: '100%',
      },
    },
    MuiInput: {
      input: {
        border: '1px solid #98b0b7',
        boxSizing: 'border-box',
        borderRadius: '4px',
        fontFamily: 'Inter',
        fontSize: '1rem',
        paddingLeft: '10px',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        marginBottom: '1rem',

        '&::placeholder': {
          color: color.middleGrey,
          opacity: 1,
        },
        '&:not(::placeholder-shown)': {
          border: '1px solid color.black',
        },
      },
    },
  },
})

const TagWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  button {
    position: absolute;
    right: 20px;
    margin-top: 4px;
    padding: 7px 12px;
    background: ${color.redLight};
    border: none;
    border-radius: 4px;
    color: ${color.white};
    &:hover {
      box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.24);
    }
    outline: none;
    &:focus {
      outline: none;
    }
    :disabled {
      border: 1px solid ${color.lightGrey};
      background: ${color.lightGrey};
      &:hover {
        box-shadow: none;
      }
    }
  }
  input {
    width: 100%;
    border: 1px solid ${color.middleGrey};
    box-sizing: border-box;
    border-radius: 4px;
    font-family: Inter;
    font-size: 1rem;
    padding-left: 10px;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    outline: none;
    background: ${color.white};
    ::placeholder {
      color: #98b0b7;
    }
    ${(props) =>
      props.value &&
      `
    border: 1px solid ${color.black};
  `}
    ${(props) =>
      props.suggestion &&
      `
    margin-bottom: 0;
  `}
  :hover {
      border: 1px solid ${color.grey};
    }
    :focus {
      border: 1px solid ${color.red};
      background: ${color.white} !important;
      color: ${color.black};
    }
    :disabled {
      border: 1px solid ${color.lightGrey};
      background: ${color.lightGrey};
    }
  }
`

const Step = (props) => {
  const inputRef = React.useRef()
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
    <>
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
        placeholder='ranger les rayons, préparer les plans de travail, ...'
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
      <TagWrapper>
        <input
          ref={inputRef}
          placeholder='entrer un mot-clé'
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
        <button
          disabled={taches && taches.length === 3}
          onClick={async (e) => {
            await inputRef.current.focus()
            handleChange('taches', inputRef.current.value, index, true)
            inputRef.current.value = ''
          }}
        >
          OK
        </button>
      </TagWrapper>
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
      <MuiPickersUtilsProvider utils={MomentUtils} locale='fr'>
        <ThemeProvider theme={datePickerTheme}>
          <Row className='p-0 mb-4'>
            <Col lg={6}>
              <InputTitle>Date de début</InputTitle>
              <DatePicker
                format='dddd DD MMMM yyyy'
                placeholder='selectionner une date'
                openTo='year'
                views={['year', 'month', 'date']}
                value={dateDebut ? dateDebut : null}
                onChange={(date) => {
                  handleChange('dateDebut', moment(date).format(), index)
                  setMinDate(date)
                }}
                autoOk={true}
                InputProps={{ disableUnderline: true }}
                cancelLabel='Annuler'
              />
            </Col>
            <Col>
              <InputTitle>Date de fin</InputTitle>
              <DatePicker
                format='dddd DD MMMM yyyy'
                placeholder='selectionner une date'
                value={dateFin ? (dateFin > minDate ? dateFin : minDate) : null}
                onChange={(date) => {
                  handleChange('dateFin', moment(date).format(), index)
                  setMinDate(false)
                }}
                autoOk={true}
                cancelLabel='Annuler'
                initialFocusedDate={minDate}
                minDate={minDate ? minDate : ''}
                InputProps={{ disableUnderline: true }}
                invalidDateMessage={false}
              />
            </Col>
          </Row>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  )
}

export default () => {
  const { profile, addItem, saveContext, check } = React.useContext(Context)
  const history = useHistory()
  const [stepState, setStepState] = React.useState(profile.experiences ? profile.experiences : [{}])
  const [submit, setSubmit] = React.useState(false)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
    copy[index].taches.splice(tagIndex, 1)
    if (copy[index].taches.length === 0) {
      copy[index].taches = undefined
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
