import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useHistory, useParams } from 'react-router-dom'
import { Formik, Form, useField, Field } from 'formik'
import {
  Alert,
  AlertIcon,
  Button,
  useDisclosure,
  Box,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Flex,
  Text,
  Stack,
  useBoolean,
  Center,
  Link,
} from '@chakra-ui/react'

import { getFormulaire, saveFormulaire } from '../../api'
import { ChatBubble, Layout } from '../../components'
import AjouterVoeux from './AjouterVoeux'
import ListeVoeux from './ListeVoeux'
import Autocomplete from './AdresseAutocomplete'

const CustomInput = (props) => {
  const [field, meta] = useField(props)
  return (
    <Box pb='5'>
      <FormControl isInvalid={meta.error && meta.touched} isRequired>
        <FormLabel>{props.label}</FormLabel>
        <Input {...field} {...props} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}

const Formulaire = (props) => {
  const [initialFormState, setInitialFormState] = useState({})
  const [currentOffer, setCurrentOffer] = useState({})
  const [loading, setLoading] = useBoolean()
  const [error, setError] = useBoolean()
  const ajouterVoeuxPopup = useDisclosure()
  const history = useHistory()
  const { id, origine } = useParams()

  useEffect(() => {
    setLoading.toggle(true)

    if (props?.byId) {
      getFormulaire(id)
        .then((result) => {
          setInitialFormState(result.data)
        })
        .catch(() => {
          setError.toggle(true)
        })
        .finally(() => setLoading.toggle(false))
    } else {
      const params = new URLSearchParams(window.location.search)
      let user = {}
      user.origine = origine ?? null
      for (let i of params) {
        let [key, value] = i
        user[key] = value
      }
      user.adresse = undefined
      setInitialFormState(user)

      setLoading.toggle(false)
    }
  }, [])

  const editOffer = (item, index) => {
    setCurrentOffer({ ...item, index })
    ajouterVoeuxPopup.onOpen()
  }

  const addOffer = () => {
    setCurrentOffer({})
    ajouterVoeuxPopup.onOpen()
  }

  const saveOffer = (values) => {
    const copy = { ...initialFormState }

    if (values.index !== undefined) {
      copy.offres[values.index] = values
      setInitialFormState(copy)
      return
    }

    if (copy.offres === undefined) {
      copy.offres = []
    }
    copy.offres.push(values)
    setInitialFormState(copy)
  }

  const removeOffer = (index) => {
    const copy = { ...initialFormState }
    copy.offres.splice(index, 1)
    setInitialFormState(copy)
  }

  const submitFormulaire = async (values, { setSubmitting }) => {
    const payload = {
      ...values,
      offres: initialFormState.offres ?? [],
      origine: initialFormState.origine,
    }
    const res = await saveFormulaire(id, payload)
    setSubmitting(false)

    if (res.status === 200) {
      history.push('/merci', { isNew: !id ? true : false })
    }
  }

  if (loading) {
    return (
      <Layout>
        <Center p={5}>
          <Text>Chargement en cours...</Text>
        </Center>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Center p={5}>
          <Box>
            <Text align='center'>Une erreur est survenu lors du chargement du formulaire.</Text>
            <Text align='center' pt={3}>
              Merci de prendre contact directement avec un administrateur en cliquant sur le lien suivant :&nbsp;
              <Link
                href="mailto:matcha@apprentissage.beta.gouv.fr?subject=Problème d'accès au formulaire"
                target='_blank'
              >
                contact
              </Link>
            </Text>
          </Box>
        </Center>
      </Layout>
    )
  }

  return (
    <Layout>
      <AjouterVoeux {...ajouterVoeuxPopup} {...currentOffer} handleSave={saveOffer} />
      <Box pb='3'>
        <Formik
          validateOnMount={true}
          enableReinitialize={true}
          initialValues={{
            raison_sociale: initialFormState?.raison_sociale ?? '',
            siret: initialFormState?.siret ?? '',
            adresse: initialFormState?.adresse ?? '',
            geo_coordonnees: initialFormState?.geo_coordonnees ?? '',
            nom: initialFormState?.nom ?? '',
            prenom: initialFormState?.prenom ?? '',
            telephone: initialFormState?.telephone ?? '',
            email: initialFormState?.email ?? '',
            offres: initialFormState?.offres,
          }}
          validationSchema={Yup.object().shape({
            raison_sociale: Yup.string().required('champs obligatoire').min(1),
            siret: Yup.string()
              .matches(/^[0-9]+$/, 'Le siret est composé uniquement de chiffre')
              .required('champs obligatoire')
              .min(14, 'le siret est sur 14 chiffres'),
            adresse: Yup.string().required('champ obligatoire'),
            nom: Yup.string().required('champ obligatoire'),
            prenom: Yup.string().required('champ obligatoire'),
            telephone: Yup.string().required('champ obligatoire'),
            email: Yup.string().email('Insérer un email valide').required('champ obligatoire'),
          })}
          onSubmit={submitFormulaire}
        >
          {({ values, isValid, isSubmitting, setFieldValue }) => {
            const hasOffer = values.offres?.length > 0

            return (
              <Form autoComplete='off'>
                <Box my='3'>
                  <Text as='strong' fontSize='md' fontFamily='Inter-bold'>
                    Renseignements sur votre entreprise
                  </Text>
                </Box>

                <CustomInput
                  name='raison_sociale'
                  label="Nom de l'engeigne"
                  type='text'
                  value={values.raison_sociale}
                />
                <CustomInput name='siret' label='SIRET' type='text' value={values.siret} maxLength='14' />

                <Field name='adresse'>
                  {({ meta, form }) => {
                    return (
                      <FormControl pb={5} isInvalid={meta.error && meta.touched} isRequired>
                        <FormLabel>Adresse</FormLabel>
                        <Autocomplete
                          handleValues={(value) => {
                            /**
                             * validator broken when using setFieldValue : https://github.com/formium/formik/issues/2266
                             * work around until v3 : setTimeout
                             */
                            setTimeout(() => {
                              setFieldValue('adresse', value.name)
                              setFieldValue('geo_coordonnees', value.geo_coordonnees)
                            })
                          }}
                          defaultValue={values.adresse}
                          setFieldTouched={form.setFieldTouched}
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )
                  }}
                </Field>

                <Box mb='3'>
                  <Text as='strong' fontSize='md' fontFamily='Inter-bold'>
                    Information sur le contact privilégié
                  </Text>
                </Box>

                <CustomInput name='nom' label='Nom' type='text' value={values.nom} />
                <CustomInput name='prenom' label='Prénom' type='test' value={values.prenom} />
                <CustomInput
                  name='telephone'
                  label='Téléphone'
                  type='tel'
                  pattern='[0-9]{10}'
                  maxLength='10'
                  value={values.telephone}
                />
                <CustomInput name='email' label='Email' type='email' value={values.email} />

                <Box bg='lightGrey' py='5' px='5' width='100%' borderRadius='2'>
                  <Box pb='6'>
                    <Text as='strong' fontSize='md' fontFamily='Inter-bold'>
                      Votre besoin de recrutement
                    </Text>
                  </Box>
                  <ChatBubble margin='0'>
                    Recherchez le domain d'activité se rapprochant le plus de votre offre d'apprentissage. Plusieurs
                    offres possibes
                  </ChatBubble>

                  {!hasOffer && (
                    <Center pt={3}>
                      <Alert status='warning'>
                        <AlertIcon />
                        Vous n'avez ajoutez aucune offre
                      </Alert>
                    </Center>
                  )}

                  <Box mt={4} mb={8}>
                    <ListeVoeux data={initialFormState?.offres} removeOffer={removeOffer} editOffer={editOffer} />
                  </Box>

                  <Stack align='center' spacing='2'>
                    <Button
                      leftIcon={<IoIosAddCircleOutline />}
                      rounded='50px'
                      onClick={addOffer}
                      bg='grey'
                      color='green'
                      size='lg'
                    >
                      Ajouter une offre d'apprentissage
                    </Button>
                  </Stack>
                </Box>

                <Flex justify='center' align='center' my='50'>
                  <Button
                    type='submit'
                    rounded='10px'
                    color='red'
                    size='lg'
                    isActive={isValid}
                    disabled={!isValid || isSubmitting}
                  >
                    Enregistrer mes offres
                  </Button>
                </Flex>
              </Form>
            )
          }}
        </Formik>
      </Box>
    </Layout>
  )
}

export default Formulaire
