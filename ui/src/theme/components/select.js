import colors from '../colors'

export default {
  // style object for base or default style
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
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for `size` and `variant`
  // defaultProps: {
  //   size: '',
  //   variant: '',
  // },
}
