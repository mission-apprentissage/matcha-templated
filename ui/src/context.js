import React from 'react'

const Context = React.createContext({
  profile: {},
  updateUser: () => {},
})

class ContextProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      updateUser: this.updateUser,
      check: this.check,
      addStep: this.addStep,
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

  addStep = (state, fn) => {
    const copy = [...state]
    copy.push({})
    fn(copy)
  }

  saveData = (history, scope, state, path) => {
    this.updateUser({ [scope]: state })
    history.push(path)
  }

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>
  }
}

export { Context, ContextProvider }
