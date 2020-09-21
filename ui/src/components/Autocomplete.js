import React from 'react'
import styled from 'styled-components'
import useAutocomplete from '@material-ui/lab/useAutocomplete'
import _ from 'lodash'

import { InputTitle } from './index'
import color from './helper/color'

const Wrapper = styled.div`
  width: 200;
  margin: 0;
  padding: 0;
  z-index: 1;
  position: 'absolute';
  list-style: none;
  background: #fff;
  overflow: 'auto';
  max-height: 200;
  border: 1px solid rgba(0, 0, 0, 0.25);
  &li[data-focus='true'] {
    background: '#4a8df6';
    color: 'white';
    cursor: 'pointer';
  }
  &li:active {
    background: '#2977f5';
    color: 'white';
  }
`

const Input = styled.input`
  border: 1px solid ${color.grey};
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Inter;
  font-size: 1rem;
  padding-left: 10px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
  width: 100%;
  outline: none;
  background: ${(props) => (props.filled ? color.lightGrey : '#FFFFFF')};
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
  console.log(props)
  const [option, setOption] = React.useState()
  const adresse = []

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    defaultValue,
  } = useAutocomplete({
    defaultValue: props.context && { name: props.context },
    id: 'autocomplete',
    options: option ? option : [],
    getOptionLabel: (option) => option.name,
    onChange: (event, value) =>
      props.fullAddress && value
        ? props.handleValues('companyAdress', value.name, props.index)
        : value
        ? props.handleValues('name', value.name)
        : '',
    getOptionSelected: (option, value) => option.name === value.name,
    onInputChange: _.throttle(async (event) => {
      if (props.fullAddress) {
        const value = event ? event.target.value : defaultValue
        const result = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}&limit=10`)
        const data = await result.json()
        data.features.forEach((feat) => {
          const name = `${feat.properties.label}`
          adresse.push({ name: name })
        })
        setOption(adresse)
      } else {
        const value = event ? event.target.value : defaultValue
        const result = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}&limit=10&type=municipality`)
        const data = await result.json()
        data.features.forEach((feat) => {
          const name = `${feat.properties.city}(${feat.properties.postcode.substring(0, 2)})`
          adresse.push({ name: name })
        })
        setOption(adresse)
      }
    }, 5000),
  })

  return (
    <div>
      <div {...getRootProps()}>
        <InputTitle {...getInputLabelProps()}>{props.title}</InputTitle>
        <Input {...getInputProps()} placeholder={props.placeholder} required type='text' className='mb-0' />
      </div>
      {groupedOptions.length > 0 ? (
        <Wrapper {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.name}</li>
          ))}
        </Wrapper>
      ) : null}
    </div>
  )
}
