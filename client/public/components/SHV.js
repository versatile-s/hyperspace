import React, {Component} from 'react';
import Router, { Link } from 'react-router';
import { browserHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import ReactDOM from 'react-dom';
import MakeCategory from './makeCategory';

class HyperSearch extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchedHypers: [],
      username: props.username,
      self: false
    };
    this.elasticSearch = this.elasticSearch.bind(this);
    this.setSelf = this.setSelf.bind(this);
  }

  setSelf () {
    this.setState({
      self: !this.state.self
    });
  }

  elasticSearch (e) {
    e.preventDefault();
    var context = this;
    var text = e.target.value;
    if (this.state.self) {
      // if user is searching only their own hypers
      fetch('/searchLinks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          username: context.state.username
        })
      }).then(function (res) {
        res.json().then(function (resText) {      
          context.setState({
            searchedHypers: resText
          });
        });
      });
    } else {
      // if user is searching all hypers
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
          context.setState({
            searchedHypers: resText
          });
        });
      });    
    }
  }

  focused (e) {
    e.target.value = '';
  }

  forceFocus(){
    this.refs.hyperInput.focus();
    // ReactDOM.findDOMNode(this.refs.categoryInput).focus();
  }

  render () {
    return (
      <div>
        <div className="knob-wrapper">
          <IconMenu
            iconStyle={{opacity:.2, width:50}}
            onTouchTap={this.getCategories}
            disableAutoFocus={true}
            menuStyle={{width:250}}
            touchTapCloseDelay={0}
            initiallyKeyboardFocused={false}
            iconButtonElement={<IconButton><SearchIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            
            <FlatButton label="Search Hypers" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <div className="wrapper">
              <Checkbox onClick={this.setSelf} style="float: left"/> Show only my Hypers
              <br/>
              <TextField hintText="Search Hypers" ref="hyperInput" onClick={this.forceFocus} onChange={this.elasticSearch}/>
              {this.state.searchedHypers.slice(0, 4).map((hyper) => {
                return (
                  <a href={hyper._source.url} target="_blank"> 
                    <MenuItem focusState="none" disableAutoFocus={true}>
                      <div className="search-hyper-results">
                        <p className="search-hyper-title">{hyper._source.title}</p>
                        <p className="search-hyper-username"><h5>Submitted by:</h5><h4>{hyper._source.username}</h4></p>
                        <p className="search-hyper-description">{hyper._source.description}</p>
                      </div>
                    </MenuItem>
                  </a>
                );
              })}
            </div>
          </IconMenu>
        </div> 
      </div>
    );
  }
}

export default HyperSearch;