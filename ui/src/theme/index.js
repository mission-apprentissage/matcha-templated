import { extendTheme } from '@chakra-ui/react'
import { Select, Input, Button, Textarea, FormLabel, Form } from './components'
import colors from './colors'
import { space } from './theme-beta'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = {
  colors: { ...colors },
  config,
  components: { Select, Input, Textarea, FormLabel, Form },
  space,
}

export default extendTheme(theme)
