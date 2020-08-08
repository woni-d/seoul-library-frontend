import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Main from './Main.jsx'

class Index extends Component {
  render() {
    const pages = [
      {
        path: '/',
        component: Main,
      },
    ]
    return (
      <Fragment>
        { pages.map((elem, idx) => <Route key={idx} { ...elem } />) }
      </Fragment>
    )
  }
}

export default Index