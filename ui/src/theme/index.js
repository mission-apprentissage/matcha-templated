import { extendTheme } from '@chakra-ui/react'
import { Select, Input, Button, Textarea, FormLabel, Form, FormError } from './components'
import { space } from './theme-beta'
import colors from './colors'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const fonts = {
  body: 'Marianne',
}

const theme = {
  fonts,
  colors: { ...colors },
  config,
  components: { Button, Select, Input, Textarea, FormLabel, Form, FormError },
  space,
}

export default extendTheme(theme)
