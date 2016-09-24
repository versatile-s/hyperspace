import React from 'react'
import ReactDOM from 'react-dom'

var ReactBox = React.createClass({
  render: function(){
    return (
      <div className="box">
        We're Live, Bitches.
      </div>
    );
  }
});

ReactDOM.render(
  <ReactBox />,
  document.getElementById('content')
);