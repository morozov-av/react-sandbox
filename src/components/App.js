import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ContentArea from './ContentArea';
import '../styles/App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <ContentArea />
      <Footer />
    </div>
  );
}

export default App;
