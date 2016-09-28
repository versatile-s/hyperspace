import React, {Component} from 'react';
import Router, { Link } from 'react-router';

class Side extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: 'Kira',
      categories: ['Visual Kei', 'Javascript', 'The Gazette'],
      hover: false,
      toggled: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.onMouseEnterHander = this.onMouseEnterHander.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleClick (e) {
    e.preventDefault();
    var categoryTitle = e.target.innerHTML;
    console.log(categoryTitle);
    // send user to their category of categoryTitle
    fetch('http://localhost:3000' + '/category', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        categoryTitle: categoryTitle
      })
    }).then((response) => {
      response.text().then((res) => {
        console.log(res);
      }); 
    })
    .catch((error) => {
      error.text().then((err) => {
        console.log(err);
      }); 
    });
  }

  focused (e) {
    e.target.value = '';
  }
  onMouseEnterHander() {
    this.setState({
      hover: true
    });
  }
  onMouseLeaveHandler(){
    this.setState({
      hover: false
    });
  }

  toggleMenu(){
    console.log("clicked");
    console.log(this.state.toggled);
    if (this.state.toggled) {
      this.setState({
        toggled: false
      });
    } else {
      this.setState({
        toggled:true
      });
    } 
  }

  render () {
    return (
      <div>
        <div className="knob" onClick={this.toggleMenu}>
          <p>menu</p>
        </div>
        <div className={this.state.toggled ? "side-menu" : "blank"}>
          <div className="side-menu-title">
            Options
            <div className="side-menu-search-container">
              <div className="side-menu-search">
                Category:<input className="side-menu-text-box" type="text" defaultValue="enter Category here" onFocus={this.focused} />
              </div>
              <div className="side-menu-search">
                Tag:<input className="side-menu-text-box" type="text" defaultValue="enter Tag here" onFocus={this.focused}/>
              </div>
              <Link className="side-menu-link" to='/category'><button>Link'd to /category</button></Link>
            </div>
            <div className="side-menu-category-list">
              <table className="category-table">
                <tr>
                  <th>My Categories</th>
                </tr>
                {this.state.categories.map((category) => {
                  return (
                    <tr>
                      <td className="side-menu-category" onClick={this.handleClick} >{category}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

export default Side;