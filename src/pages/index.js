import React, { Component } from 'react'
import { Route } from 'react-router-dom'

class Pages extends Component {
  render() {
    const pages = [
      {
        path: '/',
        component: import('./main'),
      },
    ]
    return (
      <>
        { pages.map((elem, idx) => <Route key={idx} { ...elem } />) }
      </>
    )
  }
}

export default Pages