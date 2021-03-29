import colors from '../colors'

export default {
  parts: ['field'],
  baseStyle: {
    borderColor: colors.middleGrey,
    color: colors.middleGrey,
    _focus: {
      borderColor: colors.red,
      color: colors.middleGrey,
    },
    _hover: {
      borderColor: colors.grey,
      color: colors.middleGrey,
    },
    _disable: {
      borderColor: colors.middleGrey,
      backgroundColor: colors.lightGrey,
      color: colors.middleGrey,
    },
  },
}
