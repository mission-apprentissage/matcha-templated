import { Link } from 'react-router-dom'
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Container,
  Box,
  Center,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spacer,
  Flex,
  Text,
  Badge,
  useEditableControls,
  Editable,
  EditablePreview,
  EditableInput,
  ButtonGroup,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import moment from 'moment'
import { AiOutlineEdit, AiOutlineRight, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

import { Layout } from '../../components'
import { ArrowDropRightLine } from '../../theme/components/icons/'
import { useEffect, useState } from 'react'
import { getUsers } from '../../api'

const MyTable = ({ users }) => {
  if (users.length < 0) return <div>Chargement en cours</div>

  const Date = (date) => moment(date).format('DD/MM/YYYY')

  return (
    <Box py='4'>
      <Table size='sm' bg='white'>
        <Thead borderBottom='2px solid grey'>
          <Th>Admin</Th>
          <Th py={6} paddingLeft='30px'>
            Username
          </Th>
          <Th>Email</Th>
          <Th>Organisation</Th>
          <Th>Scope des offres visibles (Origine)</Th>
          <Th>Edition</Th>
        </Thead>
        <Tbody>
          {users?.map((item, index) => {
            return (
              <Tr key={index}>
                <Td>{item.isAdmin ? 'Oui' : 'Non'}</Td>
                <Td py={4} paddingLeft='30px'>
                  {item.username}
                </Td>
                <Td>{item.email}</Td>
                <Td>{item.organization}</Td>
                <Td>{item.scope}</Td>
                <Td>
                  <Center>
                    <Link to={`/user/${item.id_form}`} target='_blank'>
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

export default () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then((users) => setUsers(users.data))
  })

  return (
    <Layout background='beige'>
      <Container maxW='container.xl' py={4}>
        <Box pt={3}>
          <Breadcrumb separator={<ArrowDropRightLine color='grey.600' />} textStyle='xs'>
            <BreadcrumbItem>
              <BreadcrumbLink textDecoration='underline' as={Link} to='/' textStyle='xs'>
                Accueil
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href='#' textStyle='xs'>
                Gestion des utilisateurs
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box textStyle='h3' fontSize={['sm', '3xl']} fontWeight='700' color='grey.800' py={3}>
          Gestion des utilisateurs
        </Box>

        <MyTable users={users} />
      </Container>
    </Layout>
  )
}
