import React from 'react'
import * as Yup from 'yup'
import { Col } from 'react-bootstrap'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'

import color from '../components/helper/color'
import {
  Tag,
  Input,
  Button,
  StepTitle,
  ChatBubble,
  InputTitle,
  NextButton,
  QuestionTitle,
  DropdownCombobox,
} from '../components'

const schema = Yup.object().shape({
  raison_social: Yup.string().required('champs obligatoire'),
  siret: Yup.string().required('champs obligatoire'),
  adresse: Yup.string().required('champ obligatoire'),
  ville: Yup.string().required('champ obligatoire'),
  nom: Yup.string().required('champ obligatoire'),
  prenom: Yup.string().required('champ obligatoire'),
  telephone: Yup.string().required('champ obligatoire'),
  email: Yup.string().required('champ obligatoire'),
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

const Formulaire = () => {
  const [inputJobItems, setInputJobItems] = React.useState([])
  const [searchItems, setSearchItems] = React.useState([{}])
  const history = useHistory()

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
    <Formik
      initialValues={{
        raison_social: '',
        siret: '',
        adresse: '',
        ville: '',
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        offres: inputJobItems || [],
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        // TODO : Save in DB
        setSubmitting(false)
        history.push('/merci')
      }}
    >
      {({ values, isValid, dirty, isSubmitting }) => {
        console.log({ isValid, isSubmitting })
        return (
          <Form>
            <StepTitle>Renseignements sur votre entreprise</StepTitle>
            <InputTitle mandatory={true}>Nom de l'enseigne</InputTitle>
            <MyInput name='raison_social' type='text' value={values.raison_social} />
            <InputTitle mandatory={true}>SIRET</InputTitle>
            <MyInput name='siret' type='text' value={values.siret} />
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
            {/* <StepTitle>Votre besoin de recrutement</StepTitle> */}
            <StepTitle>Votre offre</StepTitle>
            <ChatBubble margin={1} bubble={false}>
              Recherchez le domain d'activité se rapprochant le plus de votre offre d'apprentissage. Plusieurs offres
              possibes
            </ChatBubble>
            {/* <QuestionTitle title='Métiers' subtitle="Vous pouvez ajouter jusqu'à trois métiers" /> */}
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
            {/* <div className='pb-1'>
              {inputJobItems &&
                inputJobItems.map((x, i) => (
                  <Tag key={i} onClick={() => handleRemoveTag(i)}>
                    {x}
                  </Tag>
                ))}
            </div> */}
            <Button experience='true' onClick={() => addItem()}>
              + Ajouter une offre d'apprentissage
            </Button>
            <div className='d-flex justify-content-end mb-5'>
              <NextButton name='Envoyer mon besoin' type='submit' disabled={!(isValid && dirty) || isSubmitting} />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default () => {
  return (
    <Col>
      <Formulaire />
    </Col>
  )
}
