import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik'
import styled from 'styled-components/macro'

import { Input, InputTitle } from '../components'
import color from '../components/helper/color'
import useAuth from '../common/hooks/useAuth'
import { _post } from '../common/httpClient'

const schema = Yup.object().shape({
  username: Yup.string().required('champ obligatoire*').min(1),
  password: Yup.string().required('champ obligatoire*'),
})

const ErrorMessage = styled.div`
  font-family: Inter;
  font-size: 0.75rem;
  color: ${color.red};
`

const MyInput = (props) => {
  const [field, meta] = useField(props)
  return (
    <div className='mb-3'>
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

export default () => {
  const [, setAuth] = useAuth()
  let history = useHistory()

  let login = async (values, { setStatus }) => {
    try {
      let { token } = await _post('/api/login', values)
      setAuth(token)
      history.push('/')
    } catch (e) {
      console.error(e)
      setStatus({ error: e.prettyMessage })
    }
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={login}
    >
      {({ values, isSubmitting, isValid, dirty }) => {
        return (
          <Form>
            <InputTitle mandatory={true}>Username</InputTitle>
            <MyInput name='username' type='text' placeholder='entrez votre prénom et nom' value={values.username} />
            <InputTitle mandatory={true}>Mot de passe</InputTitle>
            <MyInput name='password' type='text' placeholder='entrez votre prénom et nom' value={values.password} />
            <div className='d-flex justify-content-end mb-5'>
              <Button type='submit' disabled={!(isValid && dirty) || isSubmitting} className='gtm-nextbutton-stepone'>
                Connexion
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
