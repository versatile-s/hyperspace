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
      newCategory:'',
      searchedHypers: [],
      switch: true 
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

  toggleSwitch (e) {
    e.preventDefault();
    this.setState({
      switch: !this.state.switch
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
          <div className="button-wrapper">
            {this.state.switch ? 
              <button className="switch-button" onClick={this.toggleSwitch}>Search Hypers</button> :
              <button className="switch-button" onClick={this.toggleSwitch}>View My Pages</button>
            }
          </div>
          <div className="side-menu-title">
            {this.state.switch ?
              <div className="container">
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
              :
              <div className="container">
                <div className="side-menu-category-list">
                  <table className="category-table">
                    <tr>
                      <th>Search Hypers</th>
                    </tr>
                    <tr>
                      <input className="side-menu-text-box" onChange={this.elasticSearch} type="text" defaultValue="Search for hypers here!" onFocus={this.focused} />
                    </tr>
                    {this.state.searchedHypers.map((hyper) => {
                      return (
                        <tr>
                          <td>
                            <div className="hyper-details">

                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            }
          </div>
        </div>
      </div>  
    );
  }
}

export default Side;