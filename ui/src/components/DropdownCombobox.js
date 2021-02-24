import React from 'react'
import { useCombobox } from 'downshift'
import styled from 'styled-components'
import color from './helper/color'
import { Input } from './index'

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
`

const CustomizedInput = styled(Input)`
  margin-bottom: 0;
`

export default (props) => {
  const itemToString = (item) => (item ? item.label : '')
  const onSelectedItemChange = ({ selectedItem }) => props.saveSelectedItem(props.valueName, selectedItem, props.index)
  const onInputValueChange = async ({ inputValue }) => props.setInputItems(await props.handleSearch(inputValue))

  const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
    itemToString,
    onInputValueChange,
    onSelectedItemChange,
    items: props.inputItems,
    initialInputValue: props.value ? props.value : '',
  })

  return (
    <div className='pb-3 mb-5'>
      <div {...getComboboxProps()}>
        <CustomizedInput placeholder='sélectionner un métier' {...getInputProps()} />
      </div>
      <Wrapper {...getMenuProps()}>
        {isOpen &&
          props.inputItems.map((item, index) => (
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
