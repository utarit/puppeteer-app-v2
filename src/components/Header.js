import React from 'react';
import logo from '../logo.svg';
import {NavLink} from 'react-router-dom';



const Header = () => (
    <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <NavLink to='/'>Main Page</NavLink>
        </header>
    </div>

);


export default Header;



        