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
import GroupIcon from 'material-ui/svg-icons/social/group';
import store from '../../store';

class FriendList extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div>
        <IconMenu
          iconStyle={{opacity:.2, width:50}}
          disableAutoFocus={true}
          menuStyle={{width:250}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton><GroupIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          
          <FlatButton label="add new page" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
          <div ref="catbox">

            
            <RaisedButton type="button" fullWidth="true" label="Create New PAge" />
          </div>
        </IconMenu>
      </div>  
    );
  }
}


export default FriendList;