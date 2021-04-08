import colors from '../colors'

export default {
  variants: {
    matcha: {
      field: {
        border: '1px solid',
        borderColor: colors.middleGrey,
        bg: 'transparent',
        _readOnly: {
          boxShadow: 'none !important',
          userSelect: 'all',
        },
        _invalid: {
          borderColor: colors.red,
          color: colors.red,
        },
        _focus: {
          borderColor: colors.red,
          color: colors.black,
        },
        _disabled: {
          border: `1px solid ${colors.lightGrey}`,
          background: colors.lightGrey,
        },
        _hover: {
          border: `1px solid ${colors.grey}`,
        },

        appearance: 'none',
        paddingBottom: '1px',
        lineHeight: 'normal',
      },
    },
  },
  defaultProps: {
    variant: 'matcha',
  },
}
