import React from 'react'
import styled from 'styled-components'
import useAutocomplete from '@material-ui/lab/useAutocomplete'

import { InputTitle } from './index'
import color from './helper/color'

const Container = styled.div`
  margin-bottom: 2rem;
`
const Wrapper = styled.ul`
  width: 95%;
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
    /* background: ${color.grey}; */
    /* color: white; */
  }
`
const Input = styled.input`
  border: 1px solid ${color.grey};
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Inter;
  font-size: 1rem;
  padding-left: 10px;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  margin-bottom: 1.5rem;
  width: 100%;
  outline: none;
  border: 1px solid ${color.middleGrey};
  ${(props) =>
    props.value &&
    `
    border: 1px solid ${color.black};
  `}
  ::placeholder {
    color: #98b0b7;
  }
  :hover {
    border: 1px solid ${color.red};
  }
  :focus {
    border: 1px solid ${color.red};
    background: ${color.white} !important;
  }
  :disabled {
    border: 1px solid ${color.lightGrey};
    background: ${color.lightGrey};
  }
`

export default (props) => {
  const [option, setOption] = React.useState()
  const adresse = []

  const onChange = (event, value) =>
    props.fullAddress && value
      ? props.handleValues('adresseEntreprise', value.name, props.index)
      : value
      ? props.handleValues('commune', value.name)
      : ''

  const onInputChange = async (event) => {
    if (props.fullAddress) {
      const value = event ? event.target.value : defaultValue
      const result = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}`)
      const data = await result.json()
      data.features.forEach((feat) => {
        const name = `${feat.properties.label}`
        adresse.push({ name: name })
      })
      setOption(adresse)
    } else {
      const value = event ? event.target.value : defaultValue
      const result = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}&type=municipality`)
      const data = await result.json()
      data.features.forEach((feat) => {
        const name = `${feat.properties.city} (${feat.properties.postcode.substring(0, 2)})`
        adresse.push({ name: name })
      })
      setOption(adresse)
    }
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
    onChange,
    onInputChange,
    options: option ? option : [],
    getOptionLabel: (option) => option.name,
    defaultValue: props.context && { name: props.context },
    getOptionSelected: (option, value) => option.name === value.name,
  })

  return (
    <Container>
      <div {...getRootProps()}>
        <InputTitle {...getInputLabelProps()}>{props.title}</InputTitle>
        <Input {...getInputProps()} placeholder={props.placeholder} required type='text' className='mb-0' />
      </div>
      {groupedOptions.length > 0 ? (
        <Wrapper {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option: option.name, index })}>{option.name}</li>
          ))}
        </Wrapper>
      ) : null}
    </Container>
  )
}
