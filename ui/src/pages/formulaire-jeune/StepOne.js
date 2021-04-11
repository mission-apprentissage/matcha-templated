import React from 'react'
import * as Yup from 'yup'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'

import { Input, InputTitle, StepTitle, ChatBubble, NextButton } from '../../components'
import color from '../../components/helper/color'
import { Context } from '../../context'

const schema = Yup.object().shape({
  prenom: Yup.string().required('champ obligatoire*').min(1),
  nom: Yup.string().required('champ obligatoire*').min(1),
  dateNaissance: Yup.date().required('champ obligatoire*'),
  telephone: Yup.string().required('champ obligatoire*').min(1),
  email: Yup.string().email('Adresse email invalide').required('champ obligatoire*').min(1),
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
  const {
    updateUser,
    profile: { candidat },
  } = React.useContext(Context)
  const history = useHistory()

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        prenom: candidat?.prenom ?? '',
        nom: candidat?.nom ?? '',
        dateNaissance: candidat?.dateNaissance ?? '',
        telephone: candidat?.telephone ?? '',
        email: candidat?.email ?? '',
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        updateUser({ user: values })
        setSubmitting(false)
        history.push('/step-two')
      }}
    >
      {({ values, isSubmitting, isValid, dirty }) => {
        return (
          <Form>
            <InputTitle mandatory={true}>Prénom</InputTitle>
            <MyInput name='prenom' type='text' placeholder='entrez votre prénom et nom' value={values.prenom} />
            <InputTitle mandatory={true}>Nom</InputTitle>
            <MyInput name='nom' type='text' placeholder='entrez votre prénom et nom' value={values.nom} />
            <InputTitle mandatory={true}>Date de naissance</InputTitle>
            <MyInput name='dateNaissance' type='date' value={values.dateNaissance} hide={true} />
            <InputTitle mandatory={true}>Téléphone</InputTitle>
            <MyInput name='telephone' type='tel' placeholder='entrez votre téléphone' value={values.telephone} />
            <InputTitle mandatory={true}>Courriel</InputTitle>
            <MyInput name='email' type='email' placeholder='entrez votre adresse email' value={values.email} />
            <div className='d-flex justify-content-end mb-5'>
              <NextButton
                type='submit'
                disabled={!(isValid && (dirty || candidat)) || isSubmitting}
                className='gtm-nextbutton-stepone'
              />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default () => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <StepTitle>Etape 1/6 - Vos coordonnées</StepTitle>
      <ChatBubble>Pour vous faciliter la tâche, j’ai récupéré vos coordonnées dans votre dossier parcoursup</ChatBubble>
      <Formulaire />
    </>
  )
}
