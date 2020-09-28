import React from 'react'
import { useCombobox } from 'downshift'
import { Col } from 'react-bootstrap'
import styled from 'styled-components'
import { StepTitle, ChatBubble, QuestionTitle } from '../../components'
import color from '../../components/helper/color'

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
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
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

const DropdownCombobox = () => {
  const [inputItems, setInputItems] = React.useState([])
  const handleSearch = async (search) => {
    if (search) {
      const result = await fetch(`https://idea-mna-api.herokuapp.com/romelabels?title=${search}`)
      const data = await result.json()
      return data.labelsAndRomes
    }
    return inputItems
  }

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: async ({ inputValue }) => setInputItems(await handleSearch(inputValue)),
  })

  return (
    <div className='pb-3'>
      <div {...getComboboxProps()}>
        <Input placeholder='sélectionner un métier' value={selectedItem && selectedItem.label} {...getInputProps()} />
      </div>
      <Wrapper {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: color.lightGrey } : {}}
              key={`${item}${index}`}
              {...getItemProps({ item: item.label, index })}
            >
              {item.label}
            </li>
          ))}
      </Wrapper>
    </div>
  )
}

export default () => {
  return (
    <Col>
      <StepTitle>Etape 1/6 - Votre recherche </StepTitle>
      <ChatBubble>Quel est votre projet ? Je chercherai des entreprises qui y correspondent !</ChatBubble>
      <QuestionTitle title='Sur quel(s) métier(s) souhaitez-vous trouver un contrat en apprentissage ? ' />
      <DropdownCombobox />
      <QuestionTitle title="Dans quelle(s) formation(s) êtes-vous inscrit ou avez-vous l'intention de vous inscire ? " />
      <Input placeholder='sélectionner une formation'></Input>
    </Col>
  )
}
