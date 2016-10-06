import React, {Component} from 'react';
import Router, { Link } from 'react-router';
import { browserHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import ListIcon from 'material-ui/svg-icons/action/list';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import MakeCategory from './makeCategory';
import HyperSearch from './SHV';

class Side extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.username,
      categoryTitle: this.props.category,

      categories: [],
      toggled: false,
      newCategory:''
 
    };

    this.clickCategory = this.clickCategory.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.getCategories = this.getCategories.bind(this);

    this.makeNewCategory = this.makeNewCategory.bind(this);
    this.forceFocus = this.forceFocus.bind(this);

  }

  clickCategory(e) {
    console.log("thisdotstate.username", this.state.username);
 
    browserHistory.push('/' + this.state.username + '/' + e.target.innerHTML);
    this.props.setCategory(e.target.innerHTML);

  }

  componentDidMount() {
    console.log("side-this", this);
    this.getCategories();

  }

  getCategories () {
    console.log("Gettttting");
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

  forceFocus(){
    console.log(this);
    this.refs.categoryInput.focus();
    // ReactDOM.findDOMNode(this.refs.categoryInput).focus();
  }



  toggleMenu(){
    console.log("clicked");
    console.log(this.state.toggled);
    if (this.state.toggled) {
      this.setState({
        toggled: false
      });
    } else {
      this.setState({
        toggled:true
      });
    } 
  }

  render () {
    return (
      <div>
        <div className = "list-knob">
          <IconMenu
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
            {this.state.categories.map((category) => {
              return (
                <MenuItem focusState="none" disableAutoFocus={true} ref={category} onClick={this.clickCategory} primaryText={category}/>     
              );
            })}

          </IconMenu>
        </div> 
        <div className="create-knob"> 
          <MakeCategory setCategory={this.props.setCategory} username={this.props.username}/>
          
          
        </div>
        <div className="hyper-knob">
          <HyperSearch />
        </div>
        <div className="bored-knob">
         <a href={"/"+this.state.username+"/"+this.state.categoryTitle+"/bored"}><IconButton><ListIcon /></IconButton></a>
        </div>
      </div>
    );
  }
}

export default Side;