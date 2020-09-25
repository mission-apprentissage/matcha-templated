import React from 'react'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider'

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

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>
  }
}

export { Context, ContextProvider }
