import React from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../context'
import { _get } from '../common/httpClient'

export default function Edition(props) {
  const { updateUser } = React.useContext(Context)
  const history = useHistory()
  const { params } = props.match

  const getUserData = async () => {
    try {
      let user = await _get(`/api/questionnaire/item/${params.questionnaireId}`)
      await updateUser(user[0])
      history.push('/step-one')
    } catch (e) {
      console.error(e)
    }
  }

  React.useEffect(() => {
    getUserData()
  }, [params])

  return 'Chargement du profil en cours....'
}
