import React, {Component} from 'react';

class HyperspaceWorker extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="authBody">
        <form>
          <input id="username"/>
          <input id="password"/>
          <button className="submit">log in</button>
        </form>
      </div>
    );
  }
}

export default HyperspaceWorker;




