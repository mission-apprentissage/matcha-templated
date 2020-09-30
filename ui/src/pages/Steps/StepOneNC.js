import React from 'react'
import { useHistory } from 'react-router-dom'
import { DropdownCombobox, Input } from '../../components'
import { Col } from 'react-bootstrap'
import { StepTitle, ChatBubble, QuestionTitle, NextButton } from '../../components'
import { Context } from '../../context'
import { v4 as uuid } from 'uuid'

export default () => {
  const { updateUser } = React.useContext(Context)
  const [inputJobItems, setInputJobItems] = React.useState([])
  const [inputFieldItems, setInputFieldItems] = React.useState([])
  const [values, setValues] = React.useState()
  const history = useHistory()
  const questionnaireId = uuid()
  console.log('values', values)

  const handleJobSearch = async (search) => {
    if (search) {
      const result = await fetch(`https://idea-mna-api.herokuapp.com/romelabels?title=${search}`)
      const data = await result.json()
      return data.labelsAndRomes
    }
    return inputJobItems
  }

  const handleFieldSearch = async (search) => {
    if (search) {
      try {
        // const result = await fetch(
        //   `https://idea-mna-api.herokuapp.com/formations?rome=${search}&longitude=2.2&latitude=47&radius=20000`
        // )
        const params = {
          limit: 20,
          query: {
            uai: '0261035J',
          },
        }
        // const result = await fetch(`https://c7a5ujgw35.execute-api.eu-west-3.amazonaws.com/prod/etablissements`, {
        //   params,
        // })
        const result = await fetch(`https://c7a5ujgw35.execute-api.eu-west-3.amazonaws.com/prod/formations`, {
          params,
        })
        const data = await result.json()
        console.log('coucou', data)
      } catch (error) {
        throw new Error(error)
      }
    }
    return inputFieldItems
  }

  const handleValues = (name, value) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = () => {
    updateUser({ questionnaireId: questionnaireId, voeux: { formation: values, metier: inputJobItems[0] } })
    history.push('/step-two')
  }

  return (
    <Col>
      <StepTitle>Etape 1/6 - Votre recherche </StepTitle>
      <ChatBubble>Quel est votre projet ? Je chercherai des entreprises qui y correspondent !</ChatBubble>
      <QuestionTitle title='Sur quel(s) métier(s) souhaitez-vous trouver un contrat en apprentissage ? ' />
      <DropdownCombobox
        handleSearch={handleJobSearch}
        inputItems={inputJobItems}
        setInputItems={setInputJobItems}
        saveSelectedItem={handleValues}
        valueName='metier'
      />
      <QuestionTitle
        title="Dans quelle(s) formation(s) êtes-vous inscrit ou avez-vous l'intention de vous inscire ?"
        subtitle='Précisez bien la formation entièrement'
      />
      <Input
        placeholder='ex: BTS électrotechnique au CFA SACEF, 75009'
        onChange={(e) => handleValues('formation', e.target.value)}
      />
      {/* <DropdownCombobox
        handleSearch={handleFieldSearch}
        inputItems={inputFieldItems}
        setInputItems={setInputFieldItems}
      /> */}
      <div className='d-flex justify-content-end mb-5'>
        <NextButton onClick={() => handleSubmit()} />
      </div>
    </Col>
  )
}
