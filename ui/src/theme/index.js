import { extendTheme } from '@chakra-ui/react'
import { Select, Input, Button, Textarea, FormLabel, Form, FormError } from './components'
import colors from './colors'
import { space } from './theme-beta'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = {
  colors: { ...colors },
  config,
  components: { Button, Select, Input, Textarea, FormLabel, Form, FormError },
  space,
}

export default extendTheme(theme)
