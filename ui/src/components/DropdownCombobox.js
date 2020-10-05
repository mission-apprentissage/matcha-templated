import React from 'react'
import { useCombobox } from 'downshift'
import styled from 'styled-components'
import color from './helper/color'

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

const Input = styled.input`
  border: 1px solid ${color.middleGrey};
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Inter;
  font-size: 1rem;
  padding-left: 10px;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  width: 100%;
  outline: none;
  ::placeholder {
    color: #98b0b7;
  }
  ${(props) =>
    props.value &&
    `
    border: 1px solid ${color.black};
  `}
  :hover {
    border: 1px solid ${color.grey};
  }
  :focus {
    border: 1px solid ${color.red};
    background: ${color.white} !important;
    color: ${color.black};
  }
  :disabled {
    border: 1px solid ${color.lightGrey};
    background: ${color.lightGrey};
  }
`

export default (props) => {
  const itemToString = (item) => (item ? item.label : '')

  const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
    items: props.inputItems,
    initialInputValue: props.value ? props.value : '',
    itemToString,
    onInputValueChange: async ({ inputValue }) => props.setInputItems(await props.handleSearch(inputValue)),
    onSelectedItemChange: ({ selectedItem }) => props.saveSelectedItem(props.valueName, selectedItem, props.index),
  })

  return (
    <div className='pb-3 mb-5'>
      <div {...getComboboxProps()}>
        <Input placeholder='sélectionner un métier' {...getInputProps()} />
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
