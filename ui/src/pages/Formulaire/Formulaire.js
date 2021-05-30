import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { Formik, Form, useField, Field, useFormikContext } from 'formik'
import {
  Button,
  Box,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Link,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure,
  useBoolean,
  Center,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Spacer,
  useToast,
} from '@chakra-ui/react'
import { AiOutlineEdit } from 'react-icons/ai'
import { ArrowDropRightLine } from '../../theme/components/icons/'

import { getFormulaire, postFormulaire, postOffre, putFormulaire, putOffre } from '../../api'
import { Layout, AdresseAutocomplete } from '../../components'
import AjouterVoeux from './AjouterVoeux'
import ListeVoeux from './ListeVoeux'
import ConfirmationSuppression from './ConfirmationSuppression'

const Autosave = ({ initialFormState, setInitialFormState }) => {
  const { values } = useFormikContext()

  useEffect(() => {
    setInitialFormState({ ...initialFormState, ...values })
  }, [values])

  return null
}

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
  const [formState, setFormState] = useState({})
  const [offersList, setOffersList] = useState([])
  const [currentOffer, setCurrentOffer] = useState({})
  const [loading, setLoading] = useBoolean(true)
  const [error, setError] = useBoolean()
  const ajouterVoeuxPopup = useDisclosure()
  const confirmationSuppression = useDisclosure()
  const { id_form, origine } = useParams()
  const toast = useToast()

  useEffect(() => {
    if (props?.byId) {
      getFormulaire(id_form)
        .then((result) => {
          setFormState(result.data)
          setOffersList(result.data.offres)
        })
        .catch(() => {
          setError.toggle(true)
        })
        .finally(() => setLoading.toggle(false))
    } else {
      const params = new URLSearchParams(window.location.search)
      let form = {}
      form.origine = origine ? origine.toLowerCase().replace(/ /g, '-') : null

      for (let i of params) {
        let [key, value] = i
        form[key] = value
      }

      form.adresse = undefined
      setFormState(form)
      setLoading.toggle(false)
    }
  }, [])

  const editOffer = (offer) => {
    setCurrentOffer(offer)
    ajouterVoeuxPopup.onOpen()
  }

  const addOffer = () => {
    setCurrentOffer({})
    ajouterVoeuxPopup.onOpen()
  }

  const saveOffer = (values) => {
    if (currentOffer._id) {
      // update
      putOffre(currentOffer._id, values).then((result) => setOffersList(result.data.offres))
    } else {
      // create
      postOffre(formState.id_form, values).then((result) => {
        setOffersList(result.data.offres)
      })
    }
  }

  const extendOffer = (idOffre, values) => {
    putOffre(idOffre, values).then((result) => setOffersList(result.data.offres))
    toast({
      title: "Offre prolongé d'un mois",
      position: 'top-right',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const removeOffer = (offer) => {
    setCurrentOffer(offer)
    confirmationSuppression.onOpen()
  }

  const submitFormulaire = (values, { setSubmitting }) => {
    if (formState.id_form) {
      // update form
      putFormulaire(id_form, values).then(() => {
        setSubmitting(false)
        toast({
          title: 'Enregistré avec succès',
          position: 'top-right',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      })
    } else {
      // create form
      postFormulaire(values).then((result) => {
        setFormState(result.data)
        setSubmitting(false)
      })
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
    <>
      <Layout background='beige'>
        <AjouterVoeux {...ajouterVoeuxPopup} {...currentOffer} handleSave={saveOffer} />
        <ConfirmationSuppression
          {...confirmationSuppression}
          currentOffer={currentOffer}
          setOffersList={setOffersList}
        />
        <Container maxW='container.xl' pb={16}>
          <Box pt={3}>
            <Breadcrumb separator={<ArrowDropRightLine color='grey.600' />} textStyle='xs'>
              <BreadcrumbItem>
                <BreadcrumbLink textDecoration='underline' href='/' textStyle='xs'>
                  Accueil
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#' textStyle='xs'>
                  {formState._id ? 'Consulter vos offres en cours' : "Nouveau dépot d'offre"}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Formik
            validateOnMount={true}
            enableReinitialize={true}
            initialValues={{
              raison_sociale: formState?.raison_sociale ?? '',
              siret: formState?.siret ? formState?.siret.replace(/ /g, '') : '',
              adresse: formState?.adresse ?? '',
              geo_coordonnees: formState?.geo_coordonnees ?? '',
              nom: formState?.nom ?? '',
              prenom: formState?.prenom ?? '',
              telephone: formState?.telephone ? formState?.telephone.replace(/ /g, '') : '',
              email: formState?.email ?? '',
              origine: formState?.origine ?? '',
            }}
            validationSchema={Yup.object().shape({
              raison_sociale: Yup.string().required('champs obligatoire').min(1),
              siret: Yup.string()
                .matches(/^[0-9]+$/, 'Le siret est composé uniquement de chiffre')
                .min(14, 'le siret est sur 14 chiffres')
                .max(14, 'le siret est sur 14 chiffres')
                .required('champs obligatoire'),
              adresse: Yup.string().required('champ obligatoire'),
              nom: Yup.string().required('champ obligatoire'),
              prenom: Yup.string().required('champ obligatoire'),
              telephone: Yup.string()
                .matches(/^[0-9]+$/, 'Le siret est composé uniquement de chiffre')
                .min(10, 'le téléphone est sur 10 chiffres')
                .max(10, 'le téléphone est sur 10 chiffres')
                .required('champ obligatoire'),
              email: Yup.string().email('Insérer un email valide').required('champ obligatoire'),
            })}
            onSubmit={submitFormulaire}
          >
            {({ values, isValid, isSubmitting, setFieldValue }) => {
              const hasOffer = values.offres?.length > 0

              return (
                <Form autoComplete='off'>
                  <Autosave setInitialFormState={setFormState} initialFormState={formState} />
                  <Flex py={6}>
                    <Heading textStyle='h2' size='lg' color='grey.800'>
                      {formState.id_form ? formState.raison_sociale : 'Nouveau formulaire'}
                    </Heading>
                    <Spacer />
                    <Button
                      type='submit'
                      variant='primary'
                      leftIcon={<AiOutlineEdit />}
                      isActive={isValid}
                      disabled={!isValid || isSubmitting}
                    >
                      Enregister les informations
                    </Button>
                  </Flex>
                  <Grid templateColumns='repeat(12, 1fr)'>
                    <GridItem colSpan={12} bg='white' p={8} border='1px solid' borderColor='bluefrance'>
                      <Grid templateColumns='repeat(12, 1fr)'>
                        <GridItem colSpan={[12, 6]} p={8}>
                          <Heading size='md' pb={6}>
                            Renseignements Entreprise
                          </Heading>
                          <CustomInput
                            name='raison_sociale'
                            label="Nom de l'enseigne"
                            type='text'
                            value={values.raison_sociale}
                          />
                          <CustomInput name='siret' label='SIRET' type='text' value={values.siret} maxLength='14' />

                          <Field name='adresse'>
                            {({ meta, form }) => {
                              return (
                                <FormControl pb={5} isInvalid={meta.error && meta.touched} isRequired>
                                  <FormLabel>Adresse</FormLabel>
                                  <AdresseAutocomplete
                                    handleValues={(value) => {
                                      setFieldValue('geo_coordonnees', value.geo_coordonnees)
                                      setFieldValue('adresse', value.name)
                                    }}
                                    defaultValue={values.adresse}
                                    setFieldTouched={form.setFieldTouched}
                                  />
                                  <FormHelperText>ex: 110 rue de Grenelle 75007 Paris</FormHelperText>
                                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                                </FormControl>
                              )
                            }}
                          </Field>
                        </GridItem>
                        <GridItem colSpan={[12, 6]} p={8}>
                          <Heading size='md' pb={6}>
                            Information de contact
                          </Heading>
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
                        </GridItem>
                      </Grid>
                    </GridItem>
                  </Grid>
                </Form>
              )
            }}
          </Formik>

          {formState?._id && (
            <Box mb={12}>
              <Flex pt={12} pb={6}>
                <Heading textStyle='h2' size='lg' color='grey.800'>
                  Offre(s) disponible(s)
                </Heading>
                <Spacer />
                <Button variant='primary' leftIcon={<IoIosAddCircleOutline />} onClick={addOffer}>
                  Ajouter une offre
                </Button>
              </Flex>
              <ListeVoeux data={offersList} removeOffer={removeOffer} editOffer={editOffer} extendOffer={extendOffer} />
            </Box>
          )}
        </Container>
      </Layout>
    </>
  )
}

export default Formulaire
