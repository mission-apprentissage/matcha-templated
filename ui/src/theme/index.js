import { extendTheme } from '@chakra-ui/react'

const colors = {
  green: '#00FFB0',
  black: '#161717',
  grey: '#084355',
  redLight: '#CC144A',
  red: '#AC1242',
  veryLightGrey: '#FAFAFC',
  lightGrey: '#F2F2F7',
  middleGrey: '#98B0B7',
  white: '#FFFFFF',
}

const Input = {
  // style object for base or default style
  baseStyle: {
    border: '1px solid',
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

const theme = {
  colors: { ...colors },
  components: { Input },
}

export default extendTheme(theme)
