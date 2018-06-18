import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import MainPage from './components/MainPage';
import PdfPage from './components/PdfPage';
import SSPage from './components/SSPage';
import DomPage from './components/DomPage';
import NotFoundPage from './components/NotFoundPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
            <Header />
            <Switch>
                <Route path='/' component={MainPage} exact={true} />
                <Route path='/pdf' component={PdfPage} />
                <Route path='/screenshot' component={SSPage} />
                <Route path='/dom' component={DomPage} />
                <Route component={NotFoundPage} />
            </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
