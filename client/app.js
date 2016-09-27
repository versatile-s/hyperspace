import React, {Component} from 'react';
import {Router, Route, useRouterHistory} from 'react-router';
import Test from './test';
import Login from './login';
import Signup from './signup';
import {createHashHistory} from 'history';
import Category from './category';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

class App extends Component {
  constructor (props) {
    super(props); 
  }

  render() {
    return (

      <Router history={appHistory} >
        <Route path='/' url={this.props.url} component={Login} />
        <Route path='/login' url={this.props.url} component={Login} />
        <Route path='/signup' url={this.props.url} component={Signup} />
        <Route path='/test' component={Test} />
        <Route path='/category' component={Category} />
      </Router>

    );
  }
}

export default App;