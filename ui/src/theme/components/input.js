import colors from '../colors'

export default {
  variants: {
    matcha: {
      field: {
        border: '1px solid',
        borderColor: colors.middleGrey,
        bg: 'transparent',
        paddingY: '1.35rem',
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
      },
      addon: {
        borderBottom: '2px solid',
        borderColor: 'inherit',
        borderRadius: 0,
        paddingX: 0,
        bg: 'transparent',
      },
    },
  },
  defaultProps: {
    variant: 'matcha',
  },
}
