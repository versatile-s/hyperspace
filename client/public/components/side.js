import React, {Component} from 'react';
import Router, { Link } from 'react-router';
import { browserHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import MakeCategory from './makeCategory';
import HyperSearch from './SHV';
import FriendList from './friendList';
import MyCategories from './myCategories';
import ListIcon from 'material-ui/svg-icons/action/list';
import BoredIcon from 'material-ui/svg-icons/hardware/videogame-asset';
import Logout from './logout';

class Side extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.username,
      categoryTitle: this.props.category,

      categories: [],
      toggled: false,
      newCategory:''

    };
    console.log("sideusername", this.state.username);

    this.clickCategory = this.clickCategory.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.getCategories = this.getCategories.bind(this);

    this.makeNewCategory = this.makeNewCategory.bind(this);
    this.forceFocus = this.forceFocus.bind(this);

  }

  clickCategory(e) {
    console.log("thisdotstate.username", this.state.username);

    browserHistory.push('/' + this.state.username + '/' + e.target.innerHTML);
    this.props.setCategory(e.target.innerHTML);

  }

  componentDidMount() {
    console.log("side-this", this);
    this.getCategories();

  }

  getCategories () {
    console.log("Gettttting");
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

  makeNewCategory(){

    var context = this;
    var newCatName = this.refs.categoryInput.getValue();
    console.log("catname",newCatName);
    fetch('/category', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        name: newCatName
      })

    }).then(function(){
      browserHistory.push('/' + context.state.username + "/"+newCatName);
      context.props.setCategory(newCatName);
      context.getCategories();
    });


  }

  forceFocus(){
    console.log(this);
    this.refs.categoryInput.focus();
    // ReactDOM.findDOMNode(this.refs.categoryInput).focus();
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
      <div className = "list-knob">
        <IconMenu
          disableAutoFocus={true}
          menuStyle={{width:0, opacity:.2}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton><SettingsIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >

            <MyCategories username={this.state.username}/>
            <MakeCategory setCategory={this.props.setCategory} username={this.props.username}/>
            <HyperSearch username={this.state.username}/>
            <div className="hyper-knob"><Logout /></div>
            <FriendList username={this.state.username}/>
            <a href={"/"+this.state.username+"/"+this.state.categoryTitle+"/bored"}><IconButton iconStyle={{opacity:.2, width:50}}><BoredIcon /></IconButton></a>

        </IconMenu>
      </div>
    );
  }
}

export default Side;