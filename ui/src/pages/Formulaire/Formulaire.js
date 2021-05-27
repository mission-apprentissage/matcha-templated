import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useHistory, useParams } from 'react-router-dom'
import { Formik, Form, useField, Field, useFormikContext } from 'formik'
import {
  Alert,
  AlertIcon,
  Button,
  Box,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Flex,
  Grid,
  GridItem,
  Text,
  Stack,
  useDisclosure,
  useBoolean,
  Center,
  Link,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Spacer,
  Icon,
  Badge,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { AiOutlineRight, AiOutlineEdit, AiOutlineExclamationCircle, AiOutlineDelete } from 'react-icons/ai'
import { ArrowDropRightLine } from '../../theme/components/icons/'

import { getFormulaire, saveFormulaire } from '../../api'
import { ChatBubble, Layout, AdresseAutocomplete } from '../../components'
import AjouterVoeux from './AjouterVoeux'
import ListeVoeux from './ListeVoeux'

const Autosave = ({ initialFormState, setInitialFormState }) => {
  const { values } = useFormikContext()

  useEffect(() => {
    setInitialFormState({ ...initialFormState, ...values })
  }, [values])

  return null
}

const Offre = () => {
  return (
    <Box bg='white' p={8} border='1px solid' borderColor='bluefrance'>
      <Flex alignItems='flex-start'>
        <Text fontSize='sm' pr={9}>
          Postée le 21/03/2021
        </Text>
        <Flex alignItems='center'>
          <Icon as={AiOutlineExclamationCircle} color='bluefrance' w={5} h={5} />
          <Text fontSize='sm' pl={3}>
            Expire dans 6 jours
          </Text>
        </Flex>
        <Spacer />
        <Badge variant='published'>Active</Badge>
      </Flex>
      <VStack spacing={2} align='flex-start' pt={3} pb={9}>
        <Heading textStyle='h3' size='md'>
          Analyse financier
        </Heading>
        <Text fontSize='md' fontWeight='400'>
          Master, DEA, DESS, ingénieur
        </Text>
        <Flex direction='row'>
          <Text fontSize='md' fontWeight='400' pr={1}>
            Date de début souhaitée:
          </Text>
          <Text fontWeight='600'>26/05/2021</Text>
        </Flex>
      </VStack>
      <HStack spacing={3}>
        <Button variant='secondary' leftIcon={<AiOutlineEdit />}>
          Editer l'offre
        </Button>
        <Button variant='secondary' leftIcon={<AiOutlineEdit />}>
          Prolonger l'offre
        </Button>
        <Button
          variant='outline'
          color='redmarianne'
          borderColor='redmarianne'
          borderRadius='none'
          fontWeight='400'
          leftIcon={<AiOutlineDelete />}
          _focus={{
            boxShadow: '0px 0px 0px 3px #E1000F',
          }}
        >
          Supprimer l'offre
        </Button>
      </HStack>
    </Box>
  )
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
  const [initialFormState, setInitialFormState] = useState({})
  const [currentOffer, setCurrentOffer] = useState({})
  const [loading, setLoading] = useBoolean(true)
  const [error, setError] = useBoolean()
  const { id, origine } = useParams()
  const ajouterVoeuxPopup = useDisclosure()
  const history = useHistory()

  useEffect(() => {
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
      user.origine = origine ? origine.toLowerCase().replace(/ /g, '-') : null

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

  // if (loading) {
  //   return (
  //     <Layout>
  //       <Center p={5}>
  //         <Text>Chargement en cours...</Text>
  //       </Center>
  //     </Layout>
  //   )
  // }

  // if (error) {
  //   return (
  //     <Layout>
  //       <Center p={5}>
  //         <Box>
  //           <Text align='center'>Une erreur est survenu lors du chargement du formulaire.</Text>
  //           <Text align='center' pt={3}>
  //             Merci de prendre contact directement avec un administrateur en cliquant sur le lien suivant :&nbsp;
  //             <Link
  //               href="mailto:matcha@apprentissage.beta.gouv.fr?subject=Problème d'accès au formulaire"
  //               target='_blank'
  //             >
  //               contact
  //             </Link>
  //           </Text>
  //         </Box>
  //       </Center>
  //     </Layout>
  //   )
  // }

  return (
    <Layout background='beige'>
      <Container maxW='container.xl'>
        <Box pt={3}>
          <Breadcrumb separator={<ArrowDropRightLine color='grey.600' />} textStyle='xs'>
            <BreadcrumbItem>
              <BreadcrumbLink textDecoration='underline' href='/' textStyle='xs'>
                Accueil
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href='#' textStyle='xs'>
                Consulter vos offres en cours
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Flex py={6}>
          <Heading textStyle='h2' size='lg' color='grey.800'>
            Raison sociale
          </Heading>
          <Spacer />
          <Button variant='primary' leftIcon={<AiOutlineEdit />}>
            Editer les informations
          </Button>
        </Flex>
        <Formik
          validateOnMount={true}
          enableReinitialize={true}
          initialValues={{
            raison_sociale: initialFormState?.raison_sociale ?? '',
            siret: initialFormState?.siret ? initialFormState?.siret.replace(/ /g, '') : '',
            adresse: initialFormState?.adresse ?? '',
            geo_coordonnees: initialFormState?.geo_coordonnees ?? '',
            nom: initialFormState?.nom ?? '',
            prenom: initialFormState?.prenom ?? '',
            telephone: initialFormState?.telephone ? initialFormState?.telephone.replace(/ /g, '') : '',
            email: initialFormState?.email ?? '',
            offres: initialFormState?.offres,
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
            )
          }}
        </Formik>

        <Flex pt={12} pb={6}>
          <Heading textStyle='h2' size='lg' color='grey.800'>
            Mes offres d'embauche
          </Heading>
          <Spacer />
          <Button variant='primary' leftIcon={<IoIosAddCircleOutline />}>
            Ajouter une offre
          </Button>
        </Flex>
        <Offre />
      </Container>
    </Layout>
  )

  return (
    <Layout background='white'>
      <Container>
        <AjouterVoeux {...ajouterVoeuxPopup} {...currentOffer} handleSave={saveOffer} />
        <Box pb='3'>
          <Formik
            validateOnMount={true}
            enableReinitialize={true}
            initialValues={{
              raison_sociale: initialFormState?.raison_sociale ?? '',
              siret: initialFormState?.siret ? initialFormState?.siret.replace(/ /g, '') : '',
              adresse: initialFormState?.adresse ?? '',
              geo_coordonnees: initialFormState?.geo_coordonnees ?? '',
              nom: initialFormState?.nom ?? '',
              prenom: initialFormState?.prenom ?? '',
              telephone: initialFormState?.telephone ? initialFormState?.telephone.replace(/ /g, '') : '',
              email: initialFormState?.email ?? '',
              offres: initialFormState?.offres,
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
                  <Autosave setInitialFormState={setInitialFormState} initialFormState={initialFormState} />
                  <Box my='3'>
                    <Text as='strong' fontSize='md' fontFamily='Inter-bold'>
                      Renseignements sur votre entreprise
                    </Text>
                  </Box>

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

                  <Box mb='3'>
                    <Text as='strong' fontSize='md' fontFamily='Inter-bold'>
                      Informations sur le contact privilégié
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
                      Recherchez le domaine d'activité se rapprochant le plus de votre offre d'apprentissage. Plusieurs
                      offres possibles
                    </ChatBubble>

                    {!hasOffer && (
                      <Center pt={3}>
                        <Alert status='warning'>
                          <AlertIcon />
                          Vous n'avez ajouté aucune offre
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
      </Container>
    </Layout>
  )
}

export default Formulaire
