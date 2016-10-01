import React, {Component} from 'react';
import Router, { Link } from 'react-router';
import { browserHistory } from 'react-router';

class Side extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.username,

      categories: ['Visual Kei', 'Javascript', 'The Gazette'],
      toggled: false,
 
    };

    this.clickCategory = this.clickCategory.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

  }

  clickCategory(e) {
    console.log("thisdotstate.username", this.state.username);
 
    browserHistory.push('/' + this.state.username + '/' + e.target.innerHTML);
    this.props.setCategory(e.target.innerHTML);

  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories () {
    var context = this;
    fetch('/userCategories/?username=' + this.state.username, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      console.log('resoponse from api call',response);
      response.json()
        .then(function(categoryData) {
          console.log('categoryData', categoryData);
          context.setState({
            categories: categoryData
          });
        });
    });
  }

  focused (e) {
    e.target.value = '';
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
          <p className="knob-title">menu</p>
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
                      <td className="side-menu-category" ref={category} onClick={this.clickCategory} >{category}</td>
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