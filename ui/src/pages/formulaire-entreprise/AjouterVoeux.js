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
  Select,
  Textarea,
  Center,
  FormErrorMessage,
} from '@chakra-ui/react'
import { DropdownCombobox } from '../../components'
import { Formik } from 'formik'
import * as Yup from 'yup'

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
        libelle: props.libelle ?? '',
        romes: props.romes ?? [],
        niveau: props.niveau ?? '',
        description: props.description ?? '',
      }}
      validationSchema={Yup.object().shape({
        libelle: Yup.string().required('Champ obligatoire'),
        niveau: Yup.string(),
        description: Yup.string(),
      })}
      onSubmit={async (values, { resetForm }) => {
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
                    saveSelectedItem={(values) => {
                      /**
                       * validator broken when using setFieldValue : https://github.com/formium/formik/issues/2266
                       */
                      setTimeout(() => {
                        setFieldValue('libelle', values.label)
                        setFieldValue('romes', values.romes)
                      }, 0)
                    }}
                    name='libelle'
                    value={values.libelle}
                    placeholder="Rechercher un domaine d'activité.."
                    ref={initialRef}
                  />
                  {errors.libelle && touched.libelle && <FormErrorMessage>{errors.libelle}</FormErrorMessage>}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Formation minimum attendue</FormLabel>
                  <Select size='lg' name='niveau' defaultValue={values.niveau} onChange={handleChange}>
                    <option value='' hidden>
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
