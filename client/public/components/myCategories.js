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
      open: true
    });
    console.log("mouseOver");
  }

  closeMenu(){
    this.setState({
      open: false
    });
    console.log("mouseleave");
  }

  render () {
    return (
      <div className="knob">
          <IconMenu
            open={this.state.open}
            iconStyle={{}}
            // disableAutoFocus={true}
            menuStyle={{width:250}}
            touchTapCloseDelay={0}
            initiallyKeyboardFocused={false}
            iconButtonElement={<IconButton iconStyle={{color:"white"}} onMouseEnter={this.openMenu} onClick={this.getCategories}><ListIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            <div className="myCategories-menu" onMouseLeave={this.closeMenu}>
              <FlatButton label={this.props.params.user===store.getState().username.username?"My pages":this.props.params.user+"'s pages"} labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
              {store.getState().categories.categories.map((category) => {
                return (
                  <MenuItem focusState="none" disableAutoFocus={true} ref={category} onClick={this.clickCategory} primaryText={category}/>     
                );
              })}
            </div>  
          </IconMenu>
      </div>  
    );
  }
}

export default MyCategory;  