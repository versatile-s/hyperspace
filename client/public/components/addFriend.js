import React, {Component} from 'react';
import Side from './side';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import AddFriendIcon from 'material-ui/svg-icons/social/person-add';
import store from '../../store';

class AddFriend extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.username,
      categoryTitle: this.props.category,
      lurked: "lurk this user",
      open: false
    };
    this.addFriend = this.addFriend.bind(this);
    this.openMenu=this.openMenu.bind(this);
    this.closeMenu=this.closeMenu.bind(this);
  }

  addFriend() {
    var context=this;
    fetch('/addfriend', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.getState().username.username,
        friendName: this.props.params.user,
        friendCategory: this.props.params.category
      })
    }).then(function() {
      context.setState({
        lurked: "lurking: "+context.props.params.user+" - "+context.props.params.category
      });
        
    });
  }
  openMenu(){
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
          style={this.props.params.user===store.getState().username.username?{display:"none"}:{}}
          iconStyle={{}}
          open={this.state.open}
          // disableAutoFocus={true}
          menuStyle={{width:250}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton tooltip={"LURK"} tooltipPosition={"bottom-right"} iconStyle={{color:"white"}} ><AddFriendIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          <div className="addFriend-menu" onMouseLeave={this.closeMenu}>
            <RaisedButton type="button" style={{width: '96%', margin: '0 0 2% 2%'}} fullWidth={true} onClick={this.addFriend} label={this.state.lurked} />
          </div>
        </IconMenu>
      </div>  
    );
  }
}

export default AddFriend;