import { useState, useRef } from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react'

import { ArrowRightLine, Close } from '../../theme/components/icons'

import 'moment/locale/fr'
import { putOffre } from '../../api'

export default (props) => {
  let { isOpen, onClose, currentOffer, setOffersList } = props
  const initialRef = useRef()
  const finalRef = useRef()

  const updateOffer = (statut) => {
    putOffre(currentOffer._id, { ...currentOffer, statut }).then((result) => {
      setOffersList(result.data.offres)
      onClose()
    })
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      blockScrollOnMount={true}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent mt={['0', '3.75rem']} h={['100%', 'auto']} mb={0} borderRadius={0}>
        <Button
          display={'flex'}
          alignSelf={'flex-end'}
          color='bluefrance'
          fontSize={'epsilon'}
          onClick={onClose}
          variant='unstyled'
          p={6}
          fontWeight={400}
        >
          fermer
          <Text as={'span'} ml={2}>
            <Close boxSize={4} />
          </Text>
        </Button>
        {/* <ModalHeader px={[4, 16]} pt={[3, 6]} pb={[3, 6]}> */}
        <ModalHeader>
          <Heading as='h2' fontSize='1.5rem'>
            <Flex>
              <Text as={'span'}>
                <ArrowRightLine boxSize={26} />
              </Text>
              <Text as={'span'} ml={4}>
                l'offre a t'elle été pourvue ?
              </Text>
            </Flex>
          </Heading>
        </ModalHeader>
        <ModalBody pb={6}></ModalBody>

        <ModalFooter>
          <Button variant='secondary' mr={3} onClick={() => updateOffer('Annulée')}>
            Non
          </Button>
          <Button variant='primary' onClick={() => updateOffer('Pourvue')}>
            Oui
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
