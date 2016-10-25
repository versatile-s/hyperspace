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
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';

class FriendList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      friendsData: [],
      open: false,
      warning: false,
      confirm: false,
      friend: "",
      page: "",
      deletedName: "",
      deletedCategory: ""
    };
    this.fetchFriends = this.fetchFriends.bind(this);
    this.toFriend=this.toFriend.bind(this);
    this.openMenu=this.openMenu.bind(this);
    this.closeMenu=this.closeMenu.bind(this);
    this.warn = this.warn.bind(this);
    this.confirm = this.confirm.bind(this);
    this.handleWarnClose = this.handleWarnClose.bind(this);
    this.handleConfirmClose = this.handleConfirmClose.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
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
  warn(username, page) {
    this.setState({
      warning: true,
      friend: username,
      page: page
    });
  }
  handleWarnClose(){
    this.setState({
      warning:false,
      friend: "",
      page: ""
    });
  }

  confirm() {
    this.setState({
      confirm: true
    });
  }

  handleConfirmClose(){
    this.setState({
      confirm:false,
      friend: "",
      page: ""
    });
  }

  deleteFriend(){
    var context = this;
    fetch('/deleteFriend',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.getState().username.username,
        friend: this.state.friend,
        page: this.state.page
      })

    }).then(function(response) {
      response.json().then(function(parsedRes) {
        context.setState({
          deletedName: parsedRes.name,
          deletedCategory: parsedRes.category
        }, function() {
          context.handleWarnClose();
          context.confirm();
        });
      });
    });
  }

  render () {
    const warnActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleWarnClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.deleteFriend}
      />,
    ];
    const confirmActions = [
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.handleConfirmClose}
      />,
    ];
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
          iconButtonElement={<IconButton tooltip={"LURKEES"} tooltipPosition={"bottom-right"} iconStyle={{color:"white"}} ><GroupIcon iconStyle={{color:"white"}}/></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          <div onMouseLeave={this.closeMenu} className="friendList-menu" >
            <FlatButton label="LURK LIST" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '90%', margin: '0 0 5% 5%'}} disabled={true}/>
            { (Array.isArray(this.state.friendsData) && this.state.friendsData.length > 0) ? this.state.friendsData.map((friend) => {
              return (
                <div style={{display: "flex", flexWrap: "nowrap", alignContent: "space-between"}}>
                  <MenuItem style={{display:"inline"}} key={friend[0] + friend[1]} iconStyle={{color:"white"}} style={{width: '96%', margin: '0 0 2% 2%'}} onClick={()=>this.toFriend(friend)} primaryText={friend[0] + " - " + friend[1]}/>
                  <IconButton style={store.getState().edit.edit?{display: "inline"}:{display:"none"}} tooltip={"DELETE LURKEE"} tooltipPosition={"top-right"} onClick={()=>this.warn(friend[0], friend[1])}><DeleteIcon/></IconButton>     
                </div>
              );
            }) : null}
          </div>
        </IconMenu>
        <div>
          <Dialog
            style={{position: "fixed",zIndex:4001}}
            title="ARE YOU SURE?"
            actions={warnActions}
            modal={false}
            open={this.state.warning}
            onRequestClose={this.handleWarnClose}
          >
            Are you sure you want to delete this Lurkee?
          </Dialog>

          <Dialog
            style={{position: "fixed",zIndex:4001}}
            title="LURKEE DELETED"
            actions={confirmActions}
            modal={false}
            open={this.state.confirm}
            onRequestClose={this.handleConfirmClose}
          >
            Deleted This Page: {this.state.deletedName + " - " + this.state.deletedCategory}
          </Dialog>
        </div>
      </div>  
    );
  }
}


export default FriendList;