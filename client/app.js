import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import Test from './test';

class App extends Component {
  render() {
    return (
      <div>
        <p>ROUTER BABY</p>
        <Router>
          <Route path='/' component={Hi} />
          <Route path='/secret' component={Secret} />
          <Route path='/test' component={Test} />

        </Router>
      </div>
    );
  }
}

var Hi = () => <h1>Hi Haters</h1>;
var Secret = () => <h1>secretssssssss</h1>;

export default App;