import React from 'react';
import {NavLink} from 'react-router-dom';



const Header = () => (
    <div>
        <header className="App-header">
          <img src={'https://i.pinimg.com/originals/36/2b/a5/362ba574ed008e783506746b7e850cc3.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">MAK Puppeteer App</h1>
          <NavLink to='/'> <button id='mainpage-button'> Main Page </button></NavLink>
        </header>
    </div>

);


export default Header;



        