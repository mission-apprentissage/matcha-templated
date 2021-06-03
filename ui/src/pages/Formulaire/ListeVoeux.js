import { Button, Box, Flex, Text, Heading, Spacer, Icon, Badge, VStack, HStack, Stack, Tooltip } from '@chakra-ui/react'
import { AiOutlineEdit, AiOutlineExclamationCircle, AiOutlineDelete } from 'react-icons/ai'
import moment from 'moment'
import 'moment/locale/fr'

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

export default (props) => {
  if (!props.data) {
    return <div />
  }

  return (
    <Stack direction='column' align='stretch' spacing={3}>
      {props.data
        .filter((x) => x.statut === 'Active')
        .map((item) => {
          let isExtendable = moment().to(item.date_expiration) === 'dans 7 jours'

          return (
            <Box bg='white' p={8} border='1px solid' borderColor='bluefrance'>
              <Flex alignItems='flex-start'>
                <Text fontSize='sm' pr={9}>
                  Postée le {moment(item.date_creation).format('DD/MM/YYYY')}
                </Text>
                <Flex alignItems='center'>
                  <Icon as={AiOutlineExclamationCircle} color='bluefrance' w={5} h={5} />
                  <Text fontSize='sm' pl={3}>
                    Expire {moment().to(item.date_expiration)}
                  </Text>
                </Flex>
                <Spacer />
                {/* {getStatusBadge(item.statut)} */}
                {/* <Badge variant='published'>Active</Badge> */}
              </Flex>
              <VStack spacing={2} align='flex-start' pt={3} pb={9}>
                <Heading textStyle='h3' size='md'>
                  {item.libelle}
                </Heading>
                <Text fontSize='md' fontWeight='400'>
                  {item.niveau}
                </Text>
                {item.date_debut_apprentissage && (
                  <Flex direction='row'>
                    <Text fontSize='md' fontWeight='400' pr={1}>
                      Date de début du contrat:
                    </Text>
                    <Text fontWeight='600'>{moment(item.date_debut_apprentissage).format('DD/MM/YYYY')}</Text>
                  </Flex>
                )}
              </VStack>
              <Stack direction={['column', 'row']} spacing={3}>
                <Button variant='secondary' leftIcon={<AiOutlineEdit />} onClick={() => props.editOffer(item)}>
                  Modifier l'offre
                </Button>

                <Tooltip
                  hasArrow
                  label="Disponible une semaine avant l'expiration de l'offre"
                  placement='top'
                  isDisabled={isExtendable}
                >
                  <Box>
                    <Button
                      variant='secondary'
                      isDisabled={!isExtendable}
                      leftIcon={<AiOutlineEdit />}
                      onClick={() =>
                        props.extendOffer(item._id, {
                          ...item,
                          date_expiration: moment().add(1, 'months').format('YYYY-MM-DD'),
                        })
                      }
                    >
                      Modifier l'échéance
                    </Button>
                  </Box>
                </Tooltip>
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
                  onClick={() => props.removeOffer(item)}
                >
                  Supprimer l'offre
                </Button>
              </Stack>
            </Box>
          )
        })}
    </Stack>
  )
}
