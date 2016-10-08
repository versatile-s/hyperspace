import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Test from './components/experimental/test';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/experimental/home';
import Layout from './components/experimental/layoutTest';
import Dashboard from './components/dashboard';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Category from './components/category';
import Side from './components/side';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Bored from './components/bored';
import store from '../store';
import SpaceLogin from './components/experimental/SpaceLogin';
import Frame from './components/frame';
import Search from './components/search';
import Warpfield from './components/warpfield';
import { connect } from 'react-redux';

var loginCheck = function(cb) {
  fetch('/logincheck', {
    credentials: 'same-origin'
  })
  .then(function(res) {
    res.json().then(function(resText) {
      if (resText === 'not logged in') {
        store.dispatch({type: 'USERNAME_UPDATE', payload: ''});
      } else {
        // here is where we would want to set the state in the universal store object
        store.dispatch({type: 'USERNAME_UPDATE', payload: resText[0].username});
             
      }
    }).then(function(){
      cb();
    });
  });
};



class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      auth:false
    };
    var context=this;
    store.dispatch({type: 'AUTH_SUCCESS', payload: null});
    store.dispatch({type: 'GET_CATEGORIES', payload: []});
    store.dispatch({type: 'CAT_INFO', payload: {}});
    store.dispatch({type: 'GET_DATA', payload: []});
    store.dispatch({type: 'OPEN', payload: null});
    store.dispatch({type: 'S_HYPERS', payload: []});
    store.dispatch({type: 'SELF', payload: null});
    store.dispatch({type: 'TOGGLE_SWITCH', payload: null});
    store.dispatch({type: 'EDIT_SWITCH', payload: false});
    loginCheck(function() {
      context.setState({
        auth:true
      });
    });
    injectTapEventPlugin();
  }

  render() {

    if (this.state.auth) {
      return (
        <MuiThemeProvider>
        <Router history={browserHistory} >
          <Route component={Frame}>
            <Route component={Warpfield}>
              <Route path='/' component={Login} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route path='/dashboard' component={Dashboard}/>
              <Route path='/find' component={Search}/>
            </Route>
            <Route path='/:user/:category' component={Category} />
            <Route path='/:user/:category/bored' component={Bored}/>
          </Route>
          <Route path='/spacelogin' component={SpaceLogin} />
          <Route path='/home' component={Home} />
          <Route path='/layout' component= {Layout} />
          <Route path='/test' component={Test} />
        </Router>
        </MuiThemeProvider>
      );
    } else {
      return null;
    }
  
  }
}

<<<<<<< fd3033c0b793c69a58622b1edf4d7e00d78fb95f
export default connect()(App);
=======


export default DragDropContext(HTML5Backend)(App);
>>>>>>> refactored signin and signup google functions into separat file
