import React, {Component} from 'react';

class SideMenu extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: 'Kira',
      categories: ['Visual Kei', 'Javascript', 'The Gazette']
    };
  }

  render () {
    return (
      <div className="side-menu">
        <div className="side-menu-title">
          Options
        </div>
        <div className="side-menu-search">
          Category:<input className="side-menu-text-box" type="text" defaultValue="enter Category here" />
        </div>
      </div>
    );
  }
}

export default SideMenu;