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
  username: Yup.string().required('champ obligatoire*').min(1),
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
      <Input {...props} {...field} />
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
        username: profile.user ? profile.user.username : '',
        birthday: profile.user ? profile.user.birthday : '',
        phone: profile.user ? profile.user.phone : '',
        email: profile.user ? profile.user.email : '',
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
            <InputTitle mandatory={true}>Prénom N.</InputTitle>
            <MyInput name='username' type='text' placeholder='entrez votre prénom et nom' value={values.username} />
            <InputTitle mandatory={true}>Date de naissance</InputTitle>
            <MyInput name='birthday' type='date' value={values.birthday} hide={true} />
            <InputTitle mandatory={true}>Téléphone</InputTitle>
            <MyInput name='phone' type='tel' placeholder='entrez votre téléphone' value={values.phone} />
            <InputTitle mandatory={true}>Courriel</InputTitle>
            <MyInput name='email' type='email' placeholder='entrez votre adresse email' value={values.email} />
            <div className='d-flex justify-content-end mb-5'>
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
