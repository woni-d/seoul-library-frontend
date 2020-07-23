import React from 'react';
import { Helmet } from 'react-helmet';
import dotenv from 'dotenv';
import Pages from './pages';
import './App.css';

dotenv.config();

function App() {
  const apiKey = process.env.API_KEY;
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
        <title>Seoul Library</title>
        <link rel="canonical" href="http://127.0.0.1:3000" />
        <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`}></script>
      </Helmet>
      <Pages />
    </div>
  );
}

export default App;
