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

class MakeCategory extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.username
 
    };
    this.makeNewCategory = this.makeNewCategory.bind(this);
    this.forceFocus = this.forceFocus.bind(this);
    console.log('make category constructor this',this);
  }



  forceFocus(){
    console.log(this);
    this.refs.categoryInput.focus();
    // ReactDOM.findDOMNode(this.refs.categoryInput).focus();
  }
  getCategories () {
    var context = this;
    fetch('/userCategories/?username=' + this.state.username, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      console.log('resoponse from api call',response);
      response.json()
        .then(function(categoryData) {
          console.log('categoryData', categoryData);
          context.setState({
            categories: categoryData
          });
        });
    });
  }

  makeNewCategory(){

    var context = this;
    var newCatName = this.refs.categoryInput.getValue();
    console.log("catname",newCatName);
    fetch('/category', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        name: newCatName
      })

    }).then(function(){
      browserHistory.push('/' + context.state.username + "/"+newCatName);
      context.props.setCategory(newCatName);
      context.getCategories();
    });


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