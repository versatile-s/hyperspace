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

class MyCategory extends Component {
  constructor (props) {
    super(props);
    this.clickCategory = this.clickCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  getCategories () {
    console.log("Gettttting");
    var context = this;
    fetch('/userCategories/?username=' + store.getState().username.username, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      console.log('resoponse from api call',response);
      response.json()
        .then(function(categoryData) {
          console.log('categoryData', categoryData);
          store.dispatch({type: 'GET_CATEGORIES', payload: categoryData});
          // context.setState({
          //   categories: categoryData
          // });
        });
    });
  }
  clickCategory(e) {
    console.log("thisdotstate.username", store.getState().username.username);
  
    browserHistory.push('/' + store.getState().username.username + '/' + e.target.innerHTML);
    this.props.setCategory(e.target.innerHTML);

  }


  forceFocus(){
    console.log(this);
    this.refs.categoryInput.focus();
    // ReactDOM.findDOMNode(this.refs.categoryInput).focus();
  }
  
  


  render () {
    return (
      <div className="knob">
          <IconMenu
            iconStyle={{opacity:.2, width:50}}
            onTouchTap={this.getCategories}
            disableAutoFocus={true}
            menuStyle={{width:250}}
            touchTapCloseDelay={0}
            initiallyKeyboardFocused={false}
            iconButtonElement={<IconButton><ListIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            
            <FlatButton label="My pages" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
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