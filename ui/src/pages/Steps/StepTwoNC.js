import React from 'react'
import { Col } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form, useField } from 'formik'
import styled from 'styled-components/macro'

import { Input, InputTitle, StepTitle, ChatBubble, NextButton, PreviousButton } from '../../components'
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

const MyInput = (props) => {
  const [field, meta] = useField(props)
  return (
    <div className='mb-4'>
      <Input
        css={`
          margin-bottom: 0.2rem;
        `}
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </div>
  )
}

const Formulaire = () => {
  const {
    profile: { candidat },
    saveContext,
  } = React.useContext(Context)
  const history = useHistory()

  return (
    <Formik
      initialValues={{
        prenom: candidat ? candidat.prenom : '',
        nom: candidat ? candidat.nom : '',
        dateNaissance: candidat ? candidat.dateNaissance : '',
        telephone: candidat ? candidat.telephone : '',
        email: candidat ? candidat.email : '',
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        saveContext(history, 'candidat', values, '/step-three')
        setSubmitting(false)
      }}
    >
      {({ values, isSubmitting, isValid, dirty }) => {
        return (
          <Form>
            <InputTitle>Votre Prénom</InputTitle>
            <MyInput name='prenom' type='text' placeholder='' value={values.prenom} />
            <InputTitle>Votre Nom</InputTitle>
            <MyInput name='nom' type='text' placeholder='' value={values.nom} />
            <InputTitle>Date de naissance</InputTitle>
            <MyInput name='dateNaissance' type='date' value={values.dateNaissance} hide={true} />
            <InputTitle>À quel numéro les employeurs peuvent-ils vous joindre ? *</InputTitle>
            <MyInput name='telephone' type='tel' placeholder='' value={values.telephone} />
            <InputTitle>Sur quelle adresse-mail les employeurs peuvent-ils vous joindre ? *</InputTitle>
            <MyInput name='email' type='email' placeholder='' value={values.email} />
            {/* Numéro PSUP */}
            {/* <InputTitle>Sur quelle adresse-mail les employeurs peuvent-ils vous joindre ? *</InputTitle>
            <MyInput name='email' type='email' placeholder='' value={values.email} /> */}
            <div className='d-flex justify-content-between mb-5'>
              <Link to='step-one'>
                <PreviousButton />
              </Link>
              <NextButton type='submit' disabled={!(isValid && (dirty || candidat)) || isSubmitting} />
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
      <StepTitle>Etape 1/6 - Vos coordonnées</StepTitle>
      <ChatBubble>Pour vous faciliter la tâche, j’ai récupéré vos coordonnées dans votre dossier parcoursup</ChatBubble>
      <Formulaire />
    </Col>
  )
}
