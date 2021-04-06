import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'

export default ({ label, value }) => {
  return (
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{value}</StatNumber>
      <StatHelpText></StatHelpText>
    </Stat>
  )
}
