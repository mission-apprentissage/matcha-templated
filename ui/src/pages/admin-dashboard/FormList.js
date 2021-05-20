import { useEffect, useState } from 'react'
import { ImNewTab } from 'react-icons/im'

import { Table, Tbody, Td, Th, Thead, Tr, Heading, Container, Link, Box, Center, Icon } from '@chakra-ui/react'
import axios from 'axios'
import { Layout } from '../../components'

const MyTable = ({ data }) => {
  if (data.length < 0) return <div>Chargement en cours</div>

  return (
    <Box py='4'>
      <Table size='sm' bg='white'>
        <Thead>
          <Th>Entreprise</Th>
          <Th>Adresse</Th>
          <Th>Email</Th>
          <Th isNumeric>Téléphone</Th>
          <Th isNumeric>Nombre d'offres</Th>
          <Th>formulaire</Th>
        </Thead>
        <Tbody>
          {data &&
            data.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <strong>{item.raison_sociale}</strong>
                  </Td>
                  <Td>{item.adresse}</Td>
                  <Td>{item.email}</Td>
                  <Td isNumeric>{item.telephone}</Td>
                  <Td isNumeric>{item.offres.length}</Td>
                  <Td>
                    <Center>
                      <Link href={`/${item.id_form}`} target='_blank' isExternal>
                        Lien
                        <Icon as={ImNewTab} />
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
        <Heading size='md'>Formulaires avec offres ({state.formWithOffers.length})</Heading>
        <MyTable data={state.formWithOffers} />
      </Container>
      <Container maxW='container.xl' py={4}>
        <Heading size='md'>Formulaires complétés sans offres ({state.uncomplete.length})</Heading>
        <MyTable data={state.uncomplete} />
      </Container>
    </Layout>
  )
}
