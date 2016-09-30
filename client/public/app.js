import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Test from './components/test';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Layout from './components/layoutTest';
import Dashboard from './components/dashboard';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Category from './components/category';
import Side from './components/side';

class App extends Component {
  constructor (props) {
    super(props);
  }

   // onEnter={requireAuth}

  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/home' component={Home} />
        <Route path='/layout' component= {Layout} />
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/:user/:category' component={Category} />
        <Route path='/test' component={Test} />
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);