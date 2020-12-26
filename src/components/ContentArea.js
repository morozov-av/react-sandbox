import React from 'react';
import '../styles/ContentArea.scss';
import { Route } from "react-router-dom";

import RootPage from './RootPage';
import TicTacToy from './TicTacToy/TicTacToy';

class ContentArea extends React.Component {
  render() {
    return (
      <div className="content-area">
        <Route exact path='/' component={RootPage} />
        <Route path='/page1' component={TicTacToy}/>
        <Route path='/page2'>
          <div className="page-2-content"> Content of page 2 </div>
        </Route>
        <Route path='/page3'>
          <div className="page-3-content"> Content of page 3 </div>
        </Route>
        <Route path='/page4'>
          <div className="page-4-content"> Content of page 4 </div>
        </Route>
      </div>
    );
  }
}

export default ContentArea;
