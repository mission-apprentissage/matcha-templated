import { Circle, Box, Text, Flex, Spacer, Icon } from '@chakra-ui/react'
import { MdEdit, MdDelete } from 'react-icons/md'

export const ListWish = (props) => {
  if (!props.data) {
    return <div />
  }

  return props.data.map((item, index) => {
    return (
      <Box mb={4} key={index}>
        <Flex align='center'>
          <Box mr={4}>
            <Circle size='31px' bg='#CC144A' color='white' p={0.5}>
              {index + 1}
            </Circle>
          </Box>
          <Box>
            <Text>{item.metier?.label}</Text>
            <Text fontSize='xs'>niveau : {item.niveau}</Text>
          </Box>
          <Spacer />

          <Icon as={MdEdit} boxSize='5%' mr={2} type='button' onClick={() => props.editOffer(item, index)} />
          <Icon as={MdDelete} boxSize='5%' type='button' onClick={() => props.removeOffer(index)} />
        </Flex>
      </Box>
    )
  })
}
