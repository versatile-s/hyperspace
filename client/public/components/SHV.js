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

class HyperSearch extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchedHypers: []
    };
    this.elasticSearch = this.elasticSearch.bind(this);
  }

  elasticSearch (e) {
    e.preventDefault();
    console.log('running elasticsearch function');
    var context = this;
    var text = e.target.value;
    fetch('/searchLinks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text
      })
    }).then(function (res) {
      res.json().then(function (resText) {      
        console.log('setting searchedHypers to: ', resText);
        context.setState({
          searchedHypers: resText
        });
      });
    });
  }

  focused (e) {
    e.target.value = '';
  }

  forceFocus(){
    console.log(this);
    this.refs.hyperInput.focus();
    // ReactDOM.findDOMNode(this.refs.categoryInput).focus();
  }

  render () {
    return (
      <div>
        <div className="knob-wrapper">
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
            
            <FlatButton label="Search Hypers" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <div className="wrapper">
              <TextField hintText="Search Hypers" ref="hyperInput" onClick={this.forceFocus} onChange={this.elasticSearch}/>
              {this.state.searchedHypers.map((hyper) => {
                return (
                  <a href={hyper._source.url} target="_blank"> 
                    <MenuItem focusState="none" disableAutoFocus={true} primaryText={hyper._source.title}/>     
                  </a>
                );
              })}
            </div>
          </IconMenu>
        </div> 
        <div className="create-knob"> 
          <MakeCategory setCategory={this.props.setCategory} username={this.props.username}/>
        </div>
      </div>
    );
  }
}

export default HyperSearch;