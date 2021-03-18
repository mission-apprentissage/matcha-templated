import React from 'react'
import * as Yup from 'yup'
import { Col } from 'react-bootstrap'
import styled from 'styled-components/macro'
// import { useHistory } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'

import { _get, _post } from '../../common/httpClient'
import color from '../../components/helper/color'

import {
  Input,
  Button,
  StepTitle,
  ChatBubble,
  InputTitle,
  NextButton,
  QuestionTitle,
  DropdownCombobox,
} from '../../components'

const schema = Yup.object().shape({
  raison_social: Yup.string().required('champs obligatoire').min(1),
  siret: Yup.string()
    .matches(/^[0-9]+$/, 'Le siret est composé uniquement de chiffre')
    .required('champs obligatoire')
    .min(14, 'le siret est sur 14 chiffres'),
  adresse: Yup.string().required('champ obligatoire'),
  nom: Yup.string().required('champ obligatoire'),
  prenom: Yup.string().required('champ obligatoire'),
  telephone: Yup.string().required('champ obligatoire'),
  email: Yup.string().required('champ obligatoire'),
  // offres: Yup.array(),
})

const ErrorMessage = styled.div`
  font-family: Inter;
  font-size: 0.75rem;
  color: ${color.red};
`

const Wrapper = styled.div`
  margin-bottom: 2rem;
`

const MyInput = (props) => {
  const [field, meta] = useField(props)
  return (
    <Wrapper>
      <Input suggestion={true} {...props} {...field} />
      {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </Wrapper>
  )
}

const Formulaire = (props) => {
  const [initialFormState, setInitialFormState] = React.useState({})
  const [inputJobItems, setInputJobItems] = React.useState([])
  const [searchItems, setSearchItems] = React.useState([{}])
  const { params } = props.match
  // const history = useHistory()

  React.useEffect(() => {
    _get(`api/formulaire/${params._id}`).then((result) => setInitialFormState(result))
  }, [])

  /**
   *
   * user params comes from the URL (OPCO ATLAS)
   *
    React.useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      let user = {}
      for (let i of params) {
        let [key, value] = i
        user[key] = value
      }
      setInitialFormState(result)
    }, [])
  */

  const handleJobSearch = async (search) => {
    if (search) {
      try {
        const result = await fetch(
          `https://labonnealternance.apprentissage.beta.gouv.fr/api/romelabels?title=${search}`
        )
        const data = await result.json()
        console.log(data)
        return data.labelsAndRomes
      } catch (error) {
        throw new Error(error)
      }
    }
    return inputJobItems
  }

  const handleValues = (name, value) => {
    const copy = [...searchItems]
    copy[`${name}`] = value
    if (copy[`${name}`] === '') {
      copy[`${name}`] = undefined
    }
    setSearchItems(copy)
  }

  const handleRemoveTag = (tagIndex) => {
    const copy = [...inputJobItems]
    copy.splice(tagIndex, 1)
    if (copy.length === 0) {
      copy = []
    }
    setInputJobItems(copy)
  }

  const addItem = (state, fn) => {
    const copy = [...state]
    copy.push({})
    fn(copy)
  }

  return (
    <Col>
      <Formik
        enableReinitialize={true}
        initialValues={{
          raison_social: initialFormState.raison_social ?? '',
          siret: initialFormState.siret ?? '',
          adresse: initialFormState.adresse ?? '',
          nom: initialFormState.nom ?? '',
          prenom: initialFormState.prenom ?? '',
          telephone: initialFormState.telephone ?? '',
          email: initialFormState.email ?? '',
          // offres: inputJobItems || [],
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          // TODO : Save in DB
          console.log(values)
          let result = await _post(`api/formulaire/${params._id}`, values)
          setSubmitting(false)
          // history.push('/merci')
        }}
      >
        {({ values, isValid, dirty, isSubmitting, errors }) => {
          return (
            <Form>
              <StepTitle>Renseignements sur votre entreprise</StepTitle>

              <InputTitle mandatory={true}>Nom de l'enseigne</InputTitle>
              <MyInput name='raison_social' type='text' value={values.raison_social} />

              <InputTitle mandatory={true}>SIRET</InputTitle>
              <MyInput name='siret' type='text' value={values.siret} maxLength='14' />

              <InputTitle mandatory={true}>Adresse</InputTitle>
              <MyInput name='adresse' type='text' value={values.adresse} hide={true} />

              <StepTitle>Information sur le contact privilégié</StepTitle>

              <InputTitle mandatory={true}>Nom</InputTitle>
              <MyInput name='nom' type='text' value={values.nom} />

              <InputTitle mandatory={true}>Prénom</InputTitle>
              <MyInput name='prenom' type='test' value={values.prenom} />

              <InputTitle mandatory={true}>Téléphone</InputTitle>
              <MyInput name='telephone' type='tel' value={values.telephone} />

              <InputTitle mandatory={true}>Email</InputTitle>
              <MyInput name='email' type='email' value={values.email} />

              <StepTitle>Votre besoin de recrutement</StepTitle>
              <StepTitle>Votre offre</StepTitle>
              <ChatBubble margin={1}>
                Recherchez le domain d'activité se rapprochant le plus de votre offre d'apprentissage. Plusieurs offres
                possibes
              </ChatBubble>
              <QuestionTitle title='Métiers' subtitle="Vous pouvez ajouter jusqu'à trois métiers" />
              <QuestionTitle title="Domaine d'activité" />
              <DropdownCombobox
                handleSearch={handleJobSearch}
                inputItems={inputJobItems}
                setInputItems={setInputJobItems}
                saveSelectedItem={handleValues}
                valueName='offres'
                name='offres'
                value={values.offres?.label}
                placeholder="Rechercher un domaine d'activité.."
              />

              <Button experience='true'>+ Ajouter une offre d'apprentissage</Button>

              <div className='d-flex justify-content-end mb-5'>
                <NextButton name='Envoyer mon besoin' type='submit' disabled={!(isValid && dirty) || isSubmitting} />
              </div>
            </Form>
          )
        }}
      </Formik>
    </Col>
  )
}

export default Formulaire
