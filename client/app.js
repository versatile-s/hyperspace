import React, {Component} from 'react';
import {Router, Route, useRouterHistory} from 'react-router';
import Test from './test';
import Login from './login';
import Signup from './signup';
import Home from './home';
import Dashboard from './dashboard';
import {createHashHistory} from 'history';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Category from './category';
import Side from './side';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

class App extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (

      <Router history={appHistory} >
        <Route path='/' url={this.props.url} router={Router} component={Login} />
        <Route path='/login' url={this.props.url} router={Router} component={Login} />
        <Route path='/signup' url={this.props.url} router={Router} component={Signup} />
        <Route path='/home' url={this.props.url} router={Router} component={Home} />
        <Route path='/test' url={this.props.url} router={Router} component={Test} />
        <Route path='/category' url={this.props.url} router={Router} component={Category} />
        <Route path='/dashboard' url={this.props.url} router={Router} component={Dashboard} />
      </Router>

    );
  }
}

export default DragDropContext(HTML5Backend)(App);