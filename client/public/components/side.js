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
import store from '../../store';
import AddFriend from './addFriend';
import Logout from './logout';

class Side extends Component {
  constructor (props) {
    super(props);
    this.clickCategory = this.clickCategory.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.makeNewCategory = this.makeNewCategory.bind(this);
    this.forceFocus = this.forceFocus.bind(this);
  }

  clickCategory(e) {
    browserHistory.push('/' + this.props.username + '/' + e.target.innerHTML);
    this.props.setCategory(e.target.innerHTML);

  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories () {
    var context = this;
    fetch('/userCategories/?username=' + store.getState().username.username, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      response.json()
        .then(function(categoryData) {
          store.dispatch({type: 'GET_CATEGORIES', payload: categoryData});
          // context.setState({
          //   categories: categoryData
          // });
        });
    });
  }

  makeNewCategory(){
    var username = store.getState().username.username;
    var context = this;
    var newCatName = this.refs.categoryInput.getValue();
    fetch('/category', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        name: newCatName
      })

    }).then(function(){
      browserHistory.push('/' + username + "/"+newCatName);
      context.props.setCategory(newCatName);
      context.getCategories();
    });
  }

  forceFocus(){
    this.refs.categoryInput.focus();
    // ReactDOM.findDOMNode(this.refs.categoryInput).focus();
  }

  toggleMenu(){
    if (store.getState().toggled.toggled) {
      store.dispatch({type: 'TOGGLE_SWITCH', payload: false});
    } else {
      store.dispatch({type: 'TOGGLE_SWITCH', payload: true});
    } 
  }

  render () {
    return (
      <div className = "list-knob">
        <IconMenu
          useLayerForClickAway={true}
          disableAutoFocus={true}
          menuStyle={{width:0, opacity:.2}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton><SettingsIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MyCategories username={store.getState().username.username} setCategory={this.props.setCategory}/>
            <MakeCategory setCategory={this.props.setCategory} username={store.getState().username.username}/>
            <HyperSearch username={store.getState().username.username}/>
            <div className="hyper-knob"><Logout /></div>
            <FriendList username={store.getState().username.username}/>
            <AddFriend username={store.getState().username.username}/>
            <a href={"/"+store.getState().username.username+"/"+store.getState().categoryTitle.categoryTitle+"/bored"}><IconButton iconStyle={{opacity:.2, width:50}}><BoredIcon /></IconButton></a>
        </IconMenu>
      </div>
    );
  }
}

export default Side;