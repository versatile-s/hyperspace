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
      lurked: "lurk this user"

    };
    this.addFriend = this.addFriend.bind(this);
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

  render () {
    return (
      <div>
        <IconMenu
         style={this.props.params.user===store.getState().username.username?{display:"none"}:{}}
          iconStyle={{opacity:.2, width:50}}
          disableAutoFocus={true}
          menuStyle={{width:250}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton><AddFriendIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >

            <RaisedButton type="button" fullWidth="true" onClick={this.addFriend} label={this.state.lurked} />
          
        </IconMenu>
      </div>  
    );
  }
}


export default AddFriend;