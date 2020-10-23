import React from 'react';
import '../styles/Header.scss';

class Header extends React.Component {
  render() {
    return(
      <header className='header'>
        <ul className='header-links'>
          <li className='page1'>Page 1</li>
          <li className='page2'>Page 2</li>
          <li className='page3'>Page 3</li>
          <li className='page4'>Page 4</li>
        </ul>
        <div className='header-clock'>
          Current time
        </div>
      </header>
    );
  }
}

export default Header;
