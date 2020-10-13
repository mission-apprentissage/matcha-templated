import React from 'react'

const Context = React.createContext({
  profile: {},
  questionnaireId: '',
  updateUser: () => {},
  check: () => {},
  addItem: () => {},
  saveContext: () => {},
})

class ContextProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      questionnaireId: null,
      updateUser: this.updateUser,
      check: this.check,
      addItem: this.addItem,
      saveContext: this.saveContext,
    }
  }

  updateUser = (data) =>
    this.setState({
      profile: { ...this.state.profile, ...data },
    })

  check = (state, fn, keys) => {
    let flag = true
    for (let i = 0; i < state.length; ++i) {
      let item = state[i]
      for (let j = 0; j < keys.length; ++j) {
        let key = keys[j]
        if (item[key] === undefined) {
          flag = false
          break
        }
      }
      if (!flag) break
    }
    fn(flag)
  }

  addItem = (state, fn) => {
    const copy = [...state]
    copy.push({})
    fn(copy)
  }

  saveDataInDB = (history, path) => {
    fetch(`/api/questionnaire/items/${this.state.questionnaireId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.profile),
    })
      .then((res) => {
        if (res.status === 200) history.push(path)
      })
      .catch((error) => console.log(error))
  }

  saveContext = async (history, scope, state, path, questionnaireId) => {
    const check = scope === 'recommandations' ? Object.values(state[0]).length : 1
    if (questionnaireId) {
      await this.setState({ questionnaireId })
    }
    if (check === 0) {
      await this.updateUser({ [scope]: null })
    } else {
      await this.updateUser({ [scope]: state })
    }
    await this.saveDataInDB(history, path)
  }

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>
  }
}

export { Context, ContextProvider }
