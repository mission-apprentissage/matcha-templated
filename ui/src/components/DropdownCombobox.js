import React from 'react'
import { useCombobox } from 'downshift'
import styled from 'styled-components'
import color from './helper/color'
import { Input } from '@chakra-ui/react'

const Wrapper = styled.ul`
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
`

export default (props) => {
  let { saveSelectedItem, setInputItems, handleSearch, value, placeholder, inputItems, name } = props

  const itemToString = (item) => (item ? item.label : '')
  // const onSelectedItemChange = ({ selectedItem }) => props.saveSelectedItem(props.valueName, selectedItem, props.index)
  const onSelectedItemChange = ({ selectedItem }) => saveSelectedItem(selectedItem) // remove index for OPCO ATLAS FORM
  const onInputValueChange = async ({ inputValue }) => setInputItems(await handleSearch(inputValue))

  const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
    itemToString,
    onInputValueChange,
    onSelectedItemChange,
    items: inputItems,
    initialInputValue: value ?? '',
  })

  return (
    <div className=''>
      <div {...getComboboxProps()}>
        <Input mb='0' name={name} placeholder={placeholder || 'sélectionner un métier'} {...getInputProps()} />
      </div>
      <Wrapper {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: color.lightGrey } : {}}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item.label}
            </li>
          ))}
      </Wrapper>
    </div>
  )
}
