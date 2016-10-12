import React, {Component} from 'react';
import Router, { Link } from 'react-router';
import { browserHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import store from '../../store';

class MakeCategory extends Component {
  constructor (props) {
    super(props);
    this.makeNewCategory = this.makeNewCategory.bind(this);
    this.forceFocus = this.forceFocus.bind(this);
  }

  forceFocus(){
    this.refs.categoryInput.focus();
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
      context.props.categoryCall(username,newCatName);
      context.props.getCategory(username,newCatName);
      context.getCategories();
    });
  }

  render () {
    return (
      <div>
        <IconMenu
          style={this.props.params.user===store.getState().username.username?{}:{display:"none"}}
          useLayerForClickAway={true}
          iconStyle={{opacity:.2, width:50}}
          disableAutoFocus={true}
          menuStyle={{width:250}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton><AddIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          <FlatButton label="add new page" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
          <div ref="catbox">
            <TextField hintText="NEW PAGE TITLE" ref="categoryInput"onClick={this.forceFocus} />
            <RaisedButton type="button" fullWidth="true" label="Create New PAge" onClick={this.makeNewCategory}/>
          </div>
        </IconMenu>
      </div>  
    );
  }
}

export default MakeCategory;  