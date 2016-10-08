import React, {Component} from 'react';
import Router, { Link } from 'react-router';
import { browserHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import ListIcon from 'material-ui/svg-icons/action/list';
import store from '../../store';
import {connect} from 'react-redux';
import Category from './Category';

class MyCategory extends Component {
  constructor (props) {
    super(props);
    this.clickCategory = this.clickCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  getCategories () {
    var context = this;
    fetch('/userCategories/?username=' + this.props.params.user, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      response.json()
        .then(function(categoryData) {
          store.dispatch({type: 'GET_CATEGORIES', payload: categoryData});
          context.forceUpdate();
        });
    });
  }

  clickCategory(e) {
    browserHistory.push('/' + this.props.params.user + '/' + e.target.innerHTML);
    this.props.categoryCall(this.props.params.user,e.target.innerHTML);
  }

  forceFocus(){
    this.refs.categoryInput.focus();
  }

  render () {
    return (
      <div className="knob">
          <IconMenu
            iconStyle={{opacity:.2, width:50}}
            disableAutoFocus={true}
            menuStyle={{width:250}}
            touchTapCloseDelay={0}
            initiallyKeyboardFocused={false}
            iconButtonElement={<IconButton onClick={this.getCategories}><ListIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            <FlatButton label={this.props.params.user===store.getState().username.username?"My pages":this.props.params.user+"'s pages"} labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            {store.getState().categories.categories.map((category) => {
              return (
                <MenuItem focusState="none" disableAutoFocus={true} ref={category} onClick={this.clickCategory} primaryText={category}/>     
              );
            })}
          </IconMenu>
      </div>  
    );
  }
}

export default MyCategory;  