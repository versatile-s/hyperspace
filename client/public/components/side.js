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
import HomeIcon from 'material-ui/svg-icons/action/home';
import EditIcon from 'material-ui/svg-icons/action/build';

class Side extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: null
    };
    this.clickCategory = this.clickCategory.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.makeNewCategory = this.makeNewCategory.bind(this);
    this.forceFocus = this.forceFocus.bind(this);
    this.toBored=this.toBored.bind(this);
    this.toHome=this.toHome.bind(this);
    this.closeMenu=this.closeMenu.bind(this);
    this.startEdit=this.startEdit.bind(this);
  }

  clickCategory(e) {
    browserHistory.push('/' + store.getState().username.username + '/' + e.target.innerHTML);
    this.props.setCategory(e.target.innerHTML);
  }

  componentDidMount() {
    if (store.getState().username.username !== '') {
      this.getCategories();
    }
  }

  getCategories () {
    var context = this;
    var username = store.getState().username.username;
    if (username && username !== '') {
      fetch('/userCategories/?username=' + store.getState().username.username, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(function (response) {
        response.json().then(function(categoryData) {
          store.dispatch({type: 'GET_CATEGORIES', payload: categoryData});
        });
      });
    }
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
  }

  toggleMenu(){
    if (store.getState().toggled.toggled) {
      store.dispatch({type: 'TOGGLE_SWITCH', payload: false});
    } else {
      store.dispatch({type: 'TOGGLE_SWITCH', payload: true});
    }
  }

  toBored(){
    browserHistory.push('/' +this.props.params.user +'/'+this.props.params.category +'/bored');
  }
  toHome(){
    browserHistory.push('/' +store.getState().username.username +'/home');
    this.props.categoryCall(store.getState().username.username,"home");
    this.props.getCategory(store.getState().username.username,"home");
  }
  closeMenu(){
    var context = this;
    this.setState({
      open: false
    }, function () {
      context.setState({
        open: null
      });

    });
  }
  startEdit() {
    if (!store.getState().edit.edit) {
      store.dispatch({type: 'EDIT_SWITCH', payload: true});
    } else {
      store.dispatch({type: 'EDIT_SWITCH', payload: false});
    }
    console.log("editing:",store.getState().edit.edit);
  }

  render () {
    return (
      <div className ={this.props.params.user?"list-knob":"blank"}>
       
            <IconButton onClick={this.toHome} iconStyle={{}}><HomeIcon /></IconButton>
            <MyCategories params={this.props.params} username={store.getState().username.username} categoryCall={this.props.categoryCall} getCategory={this.props.getCategory}/>
            <MakeCategory params={this.props.params} categoryCall={this.props.categoryCall} getCategory={this.props.getCategory} />
            <HyperSearch username={store.getState().username.username}/>
            <FriendList params={this.props.params} getCategory={this.props.getCategory} categoryCall={this.props.categoryCall}/>
            <AddFriend params={this.props.params} username={store.getState().username.username}/>
            <IconButton onClick={this.startEdit} style={this.props.params.user===store.getState().username.username?{}:{display:"none"}} iconStyle={{}}><EditIcon/></IconButton>
            <IconButton onClick={this.toBored} iconStyle={{}}><BoredIcon /></IconButton>
            <Logout closeMenu={this.closeMenu}/>
     
      </div>
    );
  }
}
export default Side;