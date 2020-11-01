import React from 'react';
import '../styles/Header.scss';
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return(
      <header className='header'>
        <ul className='header-links'>

          <li className='page1'>
            <NavLink to='/page1' activeClassName='active-link'>
              Page 1
            </NavLink>
          </li>
          <li className='page2'>
            <NavLink to='/page2' activeClassName='active-link'>
              Page 2
            </NavLink>
          </li>
          <li className='page3'>
            <NavLink to='/page3' activeClassName='active-link'>
              Page 3
            </NavLink>
          </li>
          <li className='page4'>
            <NavLink to='/page4' activeClassName='active-link'>
              Page 4
            </NavLink>
          </li>
        </ul>
        <div className='header-clock'>
          Current time
        </div>
      </header>
    );
  }
}

export default Header;
