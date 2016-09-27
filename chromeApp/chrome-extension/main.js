import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class ChromeApp extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h1>WE R NOW RENDERING REACT IN R EXTENSION :) </h1>
      </div>
    );
  }
}

ReactDOM.render(<ChromeApp />, document.getElementById('content'));

