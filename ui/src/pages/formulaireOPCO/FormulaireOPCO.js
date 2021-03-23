import React from 'react'
import * as Yup from 'yup'
import { Col } from 'react-bootstrap'
import styled from 'styled-components/macro'
// import { useHistory } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'

import { _get, _post } from '../../common/httpClient'
import color from '../../components/helper/color'

import ModalAddWish from './ModalAddWish'
import { Input, Button, StepTitle, ChatBubble, InputTitle, NextButton } from '../../components'
import { ListWish } from './ListWish'
import { useDisclosure, Box } from '@chakra-ui/react'

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
  const [currentOffer, setCurrentOffer] = React.useState({})
  const popupState = useDisclosure()
  const { params } = props.match
  // const history = useHistory()

  React.useEffect(() => {
    // _get(`api/formulaire/${params._id}`).then((result) => setInitialFormState(result))
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

  const editOffer = (item, index) => {
    setCurrentOffer({ ...item, index })
    popupState.onOpen()
  }

  const addOffer = () => {
    setCurrentOffer({})
    popupState.onOpen()
  }

  const saveOffer = (values) => {
    const copy = { ...initialFormState }

    if (values.index !== undefined) {
      copy.offres[values.index] = values
      setInitialFormState(copy)
      return
    }

    console.log(copy.offres)
    if (copy.offres === undefined) {
      copy.offres = []
    }
    copy.offres.push(values)
    setInitialFormState(copy)
  }

  const removeOffer = (index) => {
    const copy = { ...initialFormState }
    copy.offres.splice(index, 1)
    setInitialFormState(copy)
  }

  console.log('STATE', initialFormState)

  return (
    <Col>
      <ModalAddWish {...popupState} {...currentOffer} handleSave={saveOffer} />
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
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          // TODO : Save in DB
          const payload = {
            ...values,
            offres: initialFormState.offres ?? [],
          }
          console.log('payload', payload)
          await _post(`api/formulaire/${params._id}`, payload)
          setSubmitting(false)
          // history.push('/merci')
        }}
      >
        {({ values, isValid, dirty, isSubmitting, errors }) => {
          console.log({ ctr: !(isValid && (dirty || initialFormState)), isValid, dirty })
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
              <ChatBubble>
                Recherchez le domain d'activité se rapprochant le plus de votre offre d'apprentissage. Plusieurs offres
                possibes
              </ChatBubble>

              <Box mt={4} mb={8}>
                <ListWish data={initialFormState.offres} removeOffer={removeOffer} editOffer={editOffer} />
              </Box>

              <Button type='button' experience='true' onClick={addOffer}>
                + Ajouter une offre d'apprentissage
              </Button>

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
