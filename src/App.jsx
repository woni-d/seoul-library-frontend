import React from 'react'
import { Helmet } from 'react-helmet'
import Pages from './pages/index'
import './App.css'

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
        <title>Seoul Library</title>
        <link rel="canonical" href="http://127.0.0.1:3000" />
        <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services&autoload=false`} />
        <link href={"https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@700&family=Song+Myung&display=swap"} rel="stylesheet" />
      </Helmet>
      <Pages />
    </div>
  )
}

export default App
