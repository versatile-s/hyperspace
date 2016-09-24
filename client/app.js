import React from 'react';
import ReactDOM from 'react-dom';

class ReactBox extends React.Component {
  constructor(props) {
    super(props);
  }  
  render() {
    return (
      <div className="box">
        We're Live, Bitches.
      </div>
    );
  }
}

ReactDOM.render(
  <ReactBox />,
  document.getElementById('content')
);