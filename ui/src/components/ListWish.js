import { Grid, GridItem, Icon, Image, Circle, Box, Text, Center, Flex } from '@chakra-ui/react'

import deleteIcon from '../assets/images/delete.svg'
import editIcon from '../assets/images/edit.svg'

export const ListWish = (props) => {
  return props.data?.map((item, index) => {
    return (
      <Grid templateColumns='15% auto 5% 5%' gap={1} p={1}>
        <GridItem>
          <Circle size='31px' bg='#CC144A' color='white' p={0.5}>
            {index + 1}
          </Circle>
        </GridItem>
        <GridItem>
          <Text>Offre</Text>
        </GridItem>
        <GridItem>
          <Center>
            <Image src={editIcon} boxSize='90%' />
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <Image src={deleteIcon} boxSize='90%' />
          </Center>
        </GridItem>
      </Grid>
    )
  })
}
