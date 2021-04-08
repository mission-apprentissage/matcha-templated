import React from 'react'
import styled from 'styled-components'
import useAutocomplete from '@material-ui/lab/useAutocomplete'

import color from '../../components/helper/color'
import { FormLabel, Input, Box, List, ListItem } from '@chakra-ui/react'

const Wrapper = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  z-index: 1;
  position: absolute;
  list-style: none;
  background: #fff;
  overflow: auto;
  box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.24);
  border-radius: 4px;
  li {
    width: 100%;
    padding: 0.5rem;
  }
  li[data-focus='true'] {
    background: ${color.lightGrey};
  }
`

export default (props) => {
  const [option, setOption] = React.useState()
  const adresse = []

  const getAddress = async (value) => {
    const result = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}`)
    const data = await result.json()
    return data
  }

  const onInputChange = async (event) => {
    const value = event ? event.target.value : defaultValue
    const data = await getAddress(value)
    data.features.forEach((feat) => {
      const name = `${feat.properties.label}`
      const coordinates = feat.geometry.coordinates.reverse().join(',')
      adresse.push({ name: name, geo_coordonnees: coordinates })
    })
    setOption(adresse)
  }

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    defaultValue,
  } = useAutocomplete({
    autoSelect: true,
    onInputChange,
    onChange: (_, value) => props.handleValues(value),
    options: option ? option : [],
    defaultValue: props.context && { name: props.context },
    getOptionLabel: (option) => option.name || '',
    getOptionSelected: (option, value) => option.name === value.name,
  })

  return (
    <Box pb='5'>
      <div {...getRootProps()}>
        {props.title && <FormLabel {...getInputLabelProps()}>{props.title}</FormLabel>}
        <Input {...getInputProps()} placeholder={props.placeholder} required type='text' className='mb-0' />
      </div>
      {groupedOptions.length > 0 ? (
        <Wrapper {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option: option.name, index })}>{option.name}</li>
          ))}
        </Wrapper>
      ) : // <List
      //   spacing='3'
      //   maxW='100%'
      //   listStyleType='none'
      //   boxShadow='0px 1px 8px rgba(8, 67, 85, 0.24)'
      //   borderRadius='4'
      //   {...getListboxProps()}
      // >
      //   {groupedOptions.map((option, index) => (
      //     <ListItem
      //       width='100%'
      //       sx={{
      //         "& [data-focus='true']": {
      //           background: color.lightGrey,
      //         },
      //       }}
      //       {...getOptionProps({ option: option.name, index })}
      //     >
      //       {option.name}
      //     </ListItem>
      //   ))}
      // </List>
      // <Box
      //   maxW='100%'
      //   listStyleType='none'
      //   boxShadow='0px 1px 8px rgba(8, 67, 85, 0.24)'
      //   borderRadius='4'
      //   {...getListboxProps()}
      // >
      //   {groupedOptions.map((option, index) => (
      //     <li {...getOptionProps({ option: option.name, index })}>{option.name}</li>
      //   ))}
      // </Box>
      null}
    </Box>
  )
}
