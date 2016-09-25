import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import Test from './test';
import Login from './login';
import Signup from './signup';

class App extends Component {
  constructor (props) {
    super(props);
    
    
  } 
  render() {
    return (
      

      <Router>
        <Route path='/login' url={this.props.url} component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/secret' component={Secret} />
        <Route path='/test' component={Test} />

      </Router>

    );
  }
}

var Hi = () => <h1>Hi Haters</h1>;
var Secret = () => <h1>secretssssssss</h1>;

export default App;