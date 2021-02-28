import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Main from './main.jsx'

class Pages extends Component {
  render() {
    return (
      <>
        <Route path="/" render={() => <Main />} />
      </>
    )
  }
}

export default Pages
