import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getOffre } from '../../api'
import { Layout } from '../../components'
import { AiOutlineRight } from 'react-icons/ai'
import {
  Center,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Box,
  Text,
  Heading,
  Stack,
  Flex,
  Badge,
  Spacer,
  Button,
} from '@chakra-ui/react'

import moment from 'moment'
import 'moment/locale/fr'

const Card = () => {}

const getStatus = (status) => {
  let [statut] = Object.keys(status).filter((x) => status[x])
  return statut
}

const getStatusBadge = (status) => {
  let [statut] = Object.keys(status).filter((x) => status[x])

  if (statut === 'filled') {
    return <Badge colorScheme='grey'>Offre pourvue</Badge>
  }

  if (statut === 'canceled') {
    return <Badge colorScheme='red'>Annulé</Badge>
  }

  if (statut === 'active') {
    return <Badge colorScheme='red'>Active</Badge>
  }
}

export default () => {
  const [formulaire, setFormulaire] = useState()
  const { id, status } = useParams()

  useEffect(() => {
    getOffre(id, status).then((result) => setFormulaire(result.data))
  }, [])

  if (!formulaire) {
    return (
      <Layout>
        <Center h='100vh'>Chargement en cours....</Center>
      </Layout>
    )
  }

  return (
    <Layout background='beige'>
      <Container maxW='container.xl' py={4}>
        <Breadcrumb spacing='4px' separator={<AiOutlineRight />}>
          <BreadcrumbItem>
            <BreadcrumbLink textDecoration='underline' href='/'>
              Accueil
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Mes offres en détails</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Box>
          {formulaire?.offres
            .sort((x, y) => y.statut.active - x.statut.active)
            .map((offre) => {
              return (
                <Box bg='white' p={10} m={10}>
                  <Flex>
                    <Box>
                      <Heading size='md'>{offre.libelle}</Heading>
                      <Text fontSize='md'>{offre.niveau}</Text>
                      <Text fontSize='md'>Publié le : {moment(offre.date_creation).format('ll')}</Text>
                    </Box>
                    <Spacer />
                    <Box>
                      <Text align='right'>{getStatusBadge(offre.statut)}</Text>
                      {getStatus(offre.statut) === 'active' && (
                        <Text fontSize='md'>Expire le : {moment(offre.date_expiration).format('d MMM')}</Text>
                      )}
                    </Box>
                  </Flex>
                  <Stack pt={2} direction='row'>
                    <Button>Prolonger d'un mois</Button>
                    <Button>Réactiver</Button>
                    <Button>Annuler</Button>
                    <Button>Offre pourvue</Button>
                  </Stack>
                </Box>
              )
            })}
        </Box>
      </Container>
    </Layout>
  )
}
