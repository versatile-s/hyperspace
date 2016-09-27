import React, {Component} from 'react';
import {Router, Route, useRouterHistory} from 'react-router';
import Test from './components/test';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';

import Layout from './components/layoutTest';


import Dashboard from './components/dashboard';

import {createHashHistory} from 'history';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Category from './components/category';
import Side from './components/side';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
appHistory.url = "http://localhost:3000";

class App extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <Router history={appHistory} >
        <Route path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/home' component={Home} />
        <Route path='/test' component={Test} />
        <Route path='/category' component={Category} />

        <Route path='/layout' component= {Layout} />

        <Route path='/dashboard' component={Dashboard} />

      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);