import React from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Center,
  FormErrorMessage,
} from '@chakra-ui/react'
import { DropdownCombobox } from '../../components'
import { Formik } from 'formik'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  metier: Yup.object().required('Champ obligatoire'),
  niveau: Yup.string().required('Champ obligatoire'),
  description: Yup.string(),
})

export default (props) => {
  let { isOpen, onClose, handleSave } = props
  const [inputJobItems, setInputJobItems] = React.useState([])
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const handleJobSearch = async (search) => {
    if (search) {
      try {
        const result = await fetch(
          `https://labonnealternance.apprentissage.beta.gouv.fr/api/romelabels?title=${search}`
        )
        const data = await result.json()
        return data.labelsAndRomes
      } catch (error) {
        throw new Error(error)
      }
    }
    return inputJobItems
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        index: props.index ?? undefined,
        metier: props.metier ?? {},
        niveau: props.niveau ?? '',
        description: props.description ?? '',
      }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm }) => {
        // console.log('form values', values)
        await handleSave(values)
        resetForm({})
        onClose()
      }}
    >
      {(props) => {
        let { values, setFieldValue, handleChange, errors, touched, isValid, isSubmitting, dirty, submitForm } = props
        return (
          <Modal
            closeOnOverlayClick={false}
            blockScrollOnMount={true}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent mt={['0', '3.75rem']} h={['100%', 'auto']} mb={0} borderRadius={0}>
              <ModalHeader bg='lightGrey' color='red'>
                <Center>Ajouter une offre</Center>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>Métier</FormLabel>
                  <DropdownCombobox
                    handleSearch={handleJobSearch}
                    inputItems={inputJobItems}
                    setInputItems={setInputJobItems}
                    saveSelectedItem={setFieldValue}
                    valueName='metier'
                    value={values.metier.label}
                    placeholder="Rechercher un domaine d'activité.."
                    ref={initialRef}
                  />
                  {errors.metier && touched.metier && <FormErrorMessage>{errors.metier}</FormErrorMessage>}
                  {/* <Input focusBorderColor='red' ref={initialRef} placeholder="Saisissez l'intituler d'un métier" /> */}
                </FormControl>

                <FormControl mt={4} isRequired>
                  <FormLabel>Formation minimum attendue</FormLabel>
                  <Select name='niveau' defaultValue={values.niveau} onChange={handleChange}>
                    <option value='' disabled hidden>
                      Choisissez un niveau
                    </option>
                    <option value='CAP, BEP'>CAP, BEP</option>
                    <option value='Baccalauréat'>Baccalauréat</option>
                    <option value='DEUG, BTS, DUT, DEUST'>DEUG, BTS, DUT, DEUST</option>
                    <option value='Licence, Licence professionnelle'>Licence, Licence professionnelle</option>
                    <option value='Maitrise, master 1'>Maitrise, master 1</option>
                    <option value='Master 2, DEA, DESS, Ingénieur'>Master 2, DEA, DESS, Ingénieur</option>
                    <option value='Doctorat, recherche'>Doctorat, recherche</option>
                  </Select>
                  {errors.niveau && touched.niveau && <FormErrorMessage>{errors.niveau}</FormErrorMessage>}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea rows='6' name='description' defaultValue={values.description} onChange={handleChange} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  type='button'
                  isFullWidth={true}
                  color='white'
                  bg='redLight'
                  mr={3}
                  borderRadius={20}
                  disabled={!(isValid && dirty) || isSubmitting}
                  onClick={submitForm}
                >
                  Ajouter l'offre
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )
      }}
    </Formik>
  )
}
