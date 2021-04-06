import colors from '../colors'

import Input from './input'

export default {
  baseStyle: {
    ...Input.variants.matcha.field,
    paddingY: '8px',
    minHeight: '80px',
    lineHeight: 'short',
  },
  defaultProps: {
    variant: 'matcha',
  },
}
