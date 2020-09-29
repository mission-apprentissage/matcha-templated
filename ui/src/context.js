import React from 'react'

const Context = React.createContext({
  profile: {},
  updateUser: () => {},
  check: () => {},
  addItem: () => {},
  saveData: () => {},
})

class ContextProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      updateUser: this.updateUser,
      check: this.check,
      addItem: this.addItem,
      saveData: this.saveData,
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

  saveData = (history, scope, state, path) => {
    const check = Object.values(state[0]).length
    if (check === 0) {
      this.updateUser({ [scope]: null })
    } else {
      this.updateUser({ [scope]: state })
    }
    history.push(path)
  }

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>
  }
}

export { Context, ContextProvider }
