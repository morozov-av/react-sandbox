import React from 'react';
import '../styles/ContentArea.scss';

class ContentArea extends React.Component {
  render() {
    return (
      <div className="content-area">
        <div className="page-1-content"> Content of page 1 </div>
        <div className="page-2-content"> Content of page 2 </div>
        <div className="page-3-content"> Content of page 3 </div>
        <div className="page-4-content"> Content of page 4 </div>
      </div>
    );
  }
}

export default ContentArea;
