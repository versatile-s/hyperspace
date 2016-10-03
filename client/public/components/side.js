import React, {Component} from 'react';
import Router, { Link } from 'react-router';
import { browserHistory } from 'react-router';


class Side extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.username,

      categories: [],
      toggled: false,
      newCategory:''
 
    };

    this.clickCategory = this.clickCategory.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.makeNewCategory = this.makeNewCategory.bind(this);

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

  handleChange(event) {
    this.setState({newCategory: event.target.value});
  }

  makeNewCategory(){
    var context = this;
    fetch('/category', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.newCategory
      })

    }).then(function(){
      browserHistory.push('/' + context.state.username + "/"+context.state.newCategory);
      context.props.setCategory(context.state.newCategory);
      context.getCategories();
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
          <p className="knob-title">menu</p>
        </div>
        <div className={this.state.toggled ? "side-menu" : "blank"}>
          <div className="side-menu-title">
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
            <div className="side-menu-search-container">
            Add new Category
              <div className="side-menu-search">
                <input className="side-menu-text-box" onChange={this.handleChange} type="text" defaultValue="New Category Title" onFocus={this.focused} />
              </div>
              <button onClick={this.makeNewCategory}>Create new category page</button>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

export default Side;