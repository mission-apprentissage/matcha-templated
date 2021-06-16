import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { AiOutlineEdit, AiOutlineRight } from 'react-icons/ai'
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Container,
  Link,
  Box,
  Center,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'

import { Layout } from '../../components'
import useAuth from '../../common/hooks/useAuth'
import { getWithQS } from '../../api'

const MyTable = ({ formulaires }) => {
  if (formulaires.length < 0) return <div>Chargement en cours</div>

  const Date = (date) => moment(date).format('DD/MM/YYYY')

  return (
    <Box py='4'>
      <Table size='sm' bg='white'>
        <Thead borderBottom='2px solid grey'>
          <Th py={6} paddingLeft='30px'>
            Raison Sociale
          </Th>
          <Th>Origine</Th>
          <Th>Nombre d'offre(s)</Th>
          <Th>Contact</Th>
          <Th>Email</Th>
          <Th>Téléphone</Th>
          <Th>Accès formulaire</Th>
        </Thead>
        <Tbody>
          {formulaires?.map((item, index) => {
            return (
              <Tr key={index}>
                <Td py={4} paddingLeft='30px'>
                  {item.raison_sociale}
                </Td>
                <Td>{item.origine}</Td>
                <Td>{item.offres.length}</Td>
                <Td>
                  {item.prenom.toLowerCase().charAt(0).toUpperCase() + item.prenom.slice(1)} {item.nom.toUpperCase()}
                </Td>
                <Td>{item.email}</Td>
                <Td>{item.telephone}</Td>
                <Td>
                  <Center>
                    <Link href={`/formulaire/${item.id_form}`} target='_blank' isExternal>
                      <Icon color='bluefrance.500' w={5} h={5} as={AiOutlineEdit} />
                    </Link>
                  </Center>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default function List() {
  const [state, setState] = useState([])
  const [loading, setLoading] = useState(true)
  const [auth] = useAuth()

  let query = auth.permissions.scope.includes('all')
    ? {
        $nor: [{ offres: { $exists: false } }, { offres: { $size: 0 } }],
      }
    : {
        $nor: [{ offres: { $exists: false } }, { offres: { $size: 0 } }],
        origine: { $regex: auth.permissions.scope },
      }

  useEffect(() => {
    getWithQS(query)
      .then((formulaires) => setState(formulaires.data.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Layout>
        <Center h='100vh'>Chargement en cours...</Center>
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
            <BreadcrumbLink href='#'>Administration des offres</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Box textStyle='h3' fontSize={['sm', '3xl']} fontWeight='700' color='grey.800' py={3}>
          Offre(s) de l'organisation : {auth.permissions.organization}
        </Box>

        <MyTable formulaires={state} />
      </Container>
    </Layout>
  )
}
