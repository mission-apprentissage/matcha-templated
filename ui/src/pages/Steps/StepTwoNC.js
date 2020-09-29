import React from 'react'
import { Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form, useField } from 'formik'
import styled from 'styled-components/macro'

import { Input, InputTitle, StepTitle, ChatBubble, NextButton } from '../../components'
import color from '../../components/helper/color'
import { Context } from '../../context'

const schema = Yup.object().shape({
  firstname: Yup.string().required('champ obligatoire*').min(1),
  lastname: Yup.string().required('champ obligatoire*').min(1),
  birthday: Yup.date().required('champ obligatoire*'),
  phone: Yup.string().required('champ obligatoire*').min(1),
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
    <>
      <Input
        css={`
          margin-bottom: 0.2rem;
        `}
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </>
  )
}

const Formulaire = () => {
  const { updateUser, profile } = React.useContext(Context)
  const history = useHistory()

  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        birthday: '',
        phone: '',
        email: '',
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        updateUser({ user: values })
        setSubmitting(false)
        history.push('/step-three')
      }}
    >
      {({ values, isSubmitting, isValid, dirty }) => {
        return (
          <Form>
            <InputTitle>Votre Prénom</InputTitle>
            <MyInput name='firstname' type='text' placeholder='' value={values.firstname} />
            <InputTitle>Votre Nom</InputTitle>
            <MyInput name='lastname' type='text' placeholder='' value={values.lastname} />
            <InputTitle>Date de naissance</InputTitle>
            <MyInput name='birthday' type='date' value={values.birthday} hide={true} />
            <InputTitle>À quel numéro les employeurs peuvent-ils vous joindre ? *</InputTitle>
            <MyInput name='phone' type='tel' placeholder='' value={values.phone} />
            <InputTitle>Sur quelle adresse-mail les employeurs peuvent-ils vous joindre ? *</InputTitle>
            <MyInput name='email' type='email' placeholder='' value={values.email} />
            <div className='d-flex justify-content-end'>
              <NextButton type='submit' disabled={!(isValid && (dirty || profile.user)) || isSubmitting} />
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
