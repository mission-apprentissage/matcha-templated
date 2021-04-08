import colors from '../colors'

export default {
  variants: {
    matcha: {
      backgroundColor: colors.lightGrey,
      color: colors.red,
      lineHeight: '1.2',
      borderRadius: 'md',
      fontWeight: 'semibold',
      _focus: {
        boxShadow: 'outline',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        boxShadow: 'none',
      },
      _hover: {
        _disabled: {
          bg: 'initial',
        },
      },
      _active: {
        bg: colors.red,
        color: colors.white,
      },
    },
  },
  defaultProps: {
    variant: 'matcha',
  },
}
