import React, {Component} from 'react';
import Side from './side';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import GroupIcon from 'material-ui/svg-icons/social/group';
import store from '../../store';

class FriendList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      friendsData: [],
      open:false
    };
    this.fetchFriends = this.fetchFriends.bind(this);
    this.toFriend=this.toFriend.bind(this);
    this.openMenu=this.openMenu.bind(this);
    this.closeMenu=this.closeMenu.bind(this);
  }

  fetchFriends() {
    var context = this;
    fetch('/getfriends', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.getState().username.username
      })
    }).then(function(data) {
      data.json().then(function(parsedData){
        context.setState({
          friendsData: parsedData
        });
      }).catch(function (err) {
        context.setState({
          friendsData: []
        });
        console.log(err);
      });
    });
  }

  toFriend(friend){
    browserHistory.push('/' + friend[0] + '/' + friend[1]);
    this.props.categoryCall(friend[0],friend[1]);
    this.props.getCategory(friend[0],friend[1]);
    this.closeMenu();
  }
  
  openMenu(){
    this.fetchFriends();
    this.setState({
      open: !this.state.open
    });
  }

  closeMenu(){
    this.setState({
      open:false
    });
  }

  render () {
    return (
      <div className="knob" onClick={this.openMenu} >
        <IconMenu onClick={this.openMenu}
          open={this.state.open}
          iconStyle={{color:"white"}}
          onTouchTap={this.fetchFriends}
          // disableAutoFocus={true}
          menuStyle={{width:250}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton iconStyle={{color:"white"}} ><GroupIcon iconStyle={{color:"white"}}/></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          <div onMouseLeave={this.closeMenu} className="friendList-menu" >
            <FlatButton label="LURK LIST" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '90%', margin: '0 0 5% 5%'}} disabled={true}/>
            { (Array.isArray(this.state.friendsData) && this.state.friendsData.length > 0) ? this.state.friendsData.map((friend) => {
              return (
               <MenuItem key={friend[0] + friend[1]} iconStyle={{color:"white"}} style={{width: '96%', margin: '0 0 2% 2%'}} onClick={()=>this.toFriend(friend)} primaryText={friend[0] + " - " + friend[1]}/>     
              );
            }) : null}
          </div>
        </IconMenu>
      </div>  
    );
  }
}


export default FriendList;