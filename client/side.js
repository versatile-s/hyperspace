import React, {Component} from 'react';
import Router, { Link } from 'react-router';

class Side extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: 'Kira',
      categories: ['Visual Kei', 'Javascript', 'The Gazette']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.preventDefault();
    var categoryTitle = e.target.value;
    console.log(categoryTitle);
    // send user to their category of categoryTitle
  }

  render () {
    return (
      <div className="side-menu">
        <div className="side-menu-title">
          Options
          <div className="side-menu-search container">
            <div className="side-menu-search">
              Category:<input className="side-menu-text-box" type="text" defaultValue="enter Category here" />
            </div>
            <div className="side-menu-search">
              Tag:<input className="side-menu-text-box" type="text" defaultValue="enter Category here" />
            </div>
            <Link className="side-menu-link" to='/category'><button>Link'd to /category</button></Link>
          </div>
          <div className="side-menu category-list">
            <table>
              <tr>
                <th>My Categories</th>
              </tr>
              {this.state.categories.map((category) => {
                return (
                  <tr>
                    <td className="side-menu-category" onClick={this.handleClick}>{category}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Side;