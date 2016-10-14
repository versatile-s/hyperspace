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
import Category from './categoryPattern';

class MyCategory extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
    this.clickCategory = this.clickCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  getCategories () {
    var context = this;
    fetch('/userCategories/?username=' + this.props.params.user, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      response.json().then(function(categoryData) {
        store.dispatch({type: 'GET_CATEGORIES', payload: categoryData});
        context.forceUpdate();
      });
    });
  }

  clickCategory(e) {
    browserHistory.push('/' + this.props.params.user + '/' + e.target.innerHTML);
    this.props.categoryCall(this.props.params.user, e.target.innerHTML);
    this.props.getCategory(this.props.params.user, e.target.innerHTML);
    this.closeMenu();
  }

  forceFocus(){
    this.refs.categoryInput.focus();
  }
  
  openMenu(){
    this.getCategories();
    this.setState({
      open: !this.state.open
    });
  }

  closeMenu(){
    this.setState({
      open: false
    });
  }

  render () {
    return (
      <div className="knob" onClick={this.openMenu} >
          <IconMenu 
            open={this.state.open}
            iconStyle={{}}
            // disableAutoFocus={true}
            menuStyle={{width:250}}
            touchTapCloseDelay={0}
            initiallyKeyboardFocused={false}
            iconButtonElement={<IconButton iconStyle={{color:"white"}} onClick={this.getCategories}><ListIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            <div onMouseLeave={this.closeMenu} className="myCategories-menu">
              <FlatButton label={this.props.params.user===store.getState().username.username?"My pages":this.props.params.user+"'s pages"} labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '90%', margin: '0 0 5% 5%'}} disabled={true}/>
              {store.getState().categories.categories.map((category) => {
                return (
                  <MenuItem key={category} style={{width: '96%', margin: '0 0 2% 2%'}} ref={category} onClick={this.clickCategory} primaryText={category}/>     
                );
              })}
            </div>  
          </IconMenu>
      </div>  
    );
  }
}

export default MyCategory;  