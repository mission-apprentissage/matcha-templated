import { useEffect, useState } from 'react'
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
import axios from 'axios'
import { Layout } from '../../components'
import moment from 'moment'

const MyTable = ({ data }) => {
  if (data.length < 0) return <div>Chargement en cours</div>

  const Date = (date) => moment(date).format('DD/MM/YYYY')

  return (
    <Box py='4'>
      <Table size='sm' bg='white'>
        <Thead borderBottom='2px solid grey'>
          <Th py={6} paddingLeft='30px'>
            Raison Sociale
          </Th>
          <Th>Nombre d'offres</Th>
          <Th>Postées le</Th>
          <Th>Expire le</Th>
          <Th></Th>
        </Thead>
        <Tbody>
          {data &&
            data.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td py={4} paddingLeft='30px'>
                    {item.raison_sociale}
                  </Td>
                  <Td>{item.offres.length}</Td>
                  <Td>{Date(item.createdAt)}</Td>
                  <Td>{Date(item.createdAt)}</Td>
                  <Td>
                    <Center>
                      <Link href={`/formulaire/${item.id_form}`} target='_blank' isExternal>
                        <Icon color='bluefrance' w={5} h={5} as={AiOutlineEdit} />
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
  const [state, setState] = useState({ formWithOffers: [], uncomplete: [] })
  const [loading, setLoading] = useState(false)

  const getWithQS = (query) => axios.get('/api/formulaire', { params: { query: JSON.stringify(query) } })

  useEffect(() => {
    ;(async function getData() {
      setLoading(true)
      const [availableOffers, uncompleteForms] = await Promise.all([
        getWithQS({ $nor: [{ offres: { $exists: false } }, { offres: { $size: 0 } }] }),
        getWithQS({ nom: { $ne: null }, offres: { $size: 0 } }),
      ])
      setState({ formWithOffers: availableOffers.data.data, uncomplete: uncompleteForms.data.data })
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <div>Chargement en cours...</div>
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
            <BreadcrumbLink href='#'>Consulter vos offres en cours</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <MyTable data={state.formWithOffers} />
      </Container>
    </Layout>
  )
}
