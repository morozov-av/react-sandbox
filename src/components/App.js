import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ContentArea from './ContentArea';
import '../styles/App.scss';

import {
  BrowserRouter as Router
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <ContentArea />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
