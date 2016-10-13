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
      open:true
    });
    console.log("mouseOver");
  }

  closeMenu(){
    this.setState({
      open:false
    });
    console.log("mouseleave");
  }

  render () {
    return (
      <div>
        <IconMenu
          open={this.state.open}

          
          iconStyle={{}}
          onTouchTap={this.fetchFriends}
          // disableAutoFocus={true}
          menuStyle={{width:250}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton onMouseEnter= {this.openMenu} ><GroupIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          <div onMouseLeave={this.closeMenu} className="friendList-menu" >
          <FlatButton onMouseLeave={this.closeMenu} label="LURK LIST" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
          {this.state.friendsData.map((friend) => {
            return (
             <MenuItem onClick={()=>this.toFriend(friend)} primaryText={friend[0] + " - " + friend[1]}/>     
            );
          })}
          </div>
        </IconMenu>
      </div>  
    );
  }
}


export default FriendList;