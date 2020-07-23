import React from 'react';
import { Helmet } from 'react-helmet';
import dotenv from 'dotenv';
import Page from './pages';
import './App.css';

dotenv.config();

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
        <title>Seoul Library</title>
        <link rel="canonical" href="http://127.0.0.1:3000" />
      </Helmet>
      <Page />
    </div>
  );
}

export default App;
