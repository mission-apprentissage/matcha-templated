const commonButtonStyle = {
  borderRadius: 0,
  textTransform: 'none',
  fontWeight: 400,
  _focus: { boxShadow: '0 0 0 3px #000091', outlineColor: 'bluefrance.500' },
}

const Button = {
  variants: {
    unstyled: {
      ...commonButtonStyle,
    },
    secondary: {
      ...commonButtonStyle,
      bg: 'white',
      color: 'bluefrance.500',
      border: '1px solid',
      borderColor: 'bluefrance.500',
      _hover: { bg: 'grey.200' },
    },
    primary: {
      ...commonButtonStyle,
      bg: 'bluefrance.500',
      color: 'white',
      _hover: { bg: 'blue.700' },
    },
  },
}

export { Button }
