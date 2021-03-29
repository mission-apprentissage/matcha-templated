import colors from '../colors'

export default {
  baseStyle: {
    borderColor: colors.middleGrey,
    color: colors.middleGrey,
    _focus: {
      borderColor: 'AC1242',
      // borderColor: colors.red,
      color: colors.middleGrey,
    },
    _hover: {
      borderColor: '#084355',
      // borderColor: colors.grey,
      color: colors.middleGrey,
    },
    _disable: {
      borderColor: colors.middleGrey,
      backgroundColor: colors.lightGrey,
      color: colors.middleGrey,
    },
  },
}
