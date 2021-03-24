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

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const Select = {
  // style object for base or default style
  parts: ['field'],
  baseStyle: {
    field: {
      border: '1px solid red',
      color: 'bleu.500',
      _focus: {
        borderColor: 'red',
      },
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

const theme = {
  colors: { ...colors },
  config,
  components: { Select },
}

export default extendTheme(theme)
