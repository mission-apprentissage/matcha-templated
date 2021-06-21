import { Link } from 'react-router-dom'
import { Box, Container, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

import { Layout } from '../../components'
import { ArrowDropRightLine } from '../../theme/components/icons/'

export default () => {
  return (
    <Layout>
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
      </Container>
    </Layout>
  )
}
