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
  nom: Yup.string(),
  telephone: Yup.string(),
  role: Yup.string(),
  email: Yup.string().email('Adresse email invalide'),
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
  const { updateUser } = React.useContext(Context)
  const history = useHistory()

  return (
    <Formik
      initialValues={{
        nom: '',
        telephone: '',
        email: '',
        role: '',
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        updateUser({ recommandation: values })
        setSubmitting(false)
        history.push('/final')
      }}
    >
      {({ values, isSubmitting, isValid, dirty, errors }) => {
        return (
          <Form>
            <InputTitle>Prénom</InputTitle>
            <MyInput name='username' type='text' value={values.username} />
            <InputTitle>Nom</InputTitle>
            <MyInput name='username' type='text' value={values.username} />
            <InputTitle>Rôle dans la structure / l'entreprise</InputTitle>
            <MyInput name='role' type='text' value={values.birthday} />
            <InputTitle>Téléphone</InputTitle>
            <MyInput name='phone' type='tel' value={values.phone} />
            <InputTitle>Courriel</InputTitle>
            <MyInput name='email' type='email' value={values.email} />
            <div className='d-flex justify-content-end'>
              <NextButton type='submit' />
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
      <StepTitle>Etape 6/6 - Recommandations</StepTitle>
      <ChatBubble>
        Pour terminer, les employeurs sont sensibles aux recommandations, avez-vous des contacts d'anciens employeurs ou
        maîtres de stages qui pourraient parler de vous à leur communiquer ?
      </ChatBubble>
      <Formulaire />
    </Col>
  )
}
