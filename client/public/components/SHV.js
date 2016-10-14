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
import MakeCategory from './createCategory';
import store from '../../store';

class HyperSearch extends Component {
  constructor (props) {
    super(props);
    store.dispatch({type: 'SELF', payload: false});
    this.state={
      open: false
    },
    this.elasticSearch = this.elasticSearch.bind(this);
    this.setSelf = this.setSelf.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  setSelf () {
    store.dispatch({type: 'SELF', payload: !store.getState().self.self});
  }

  elasticSearch (e) {
    e.preventDefault();
    var context = this;
    var text = e.target.value;
    if (store.getState().self.self) {
      fetch('/searchLinks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          username: store.getState().username.username
        })
      }).then(function (res) {
        res.json().then(function (resText) {      
          store.dispatch({type: 'S_HYPERS', payload: resText});
          context.forceUpdate();
        });
      });
    } else {
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
          store.dispatch({type: 'S_HYPERS', payload: resText});
          context.forceUpdate();
        });
      });    
    }
  }

  focused (e) {
    e.target.value = '';
  }

  forceFocus(){
    this.refs.hyperInput.focus();
  }

  openMenu(){
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
          iconStyle={{color:"white"}}
          open={this.state.open}
          useLayerForClickAway={true}
          onTouchTap={this.getCategories}
          // disableAutoFocus={true}
          menuStyle={{width:250}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton ><SearchIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          <div className="search-hyper-wrapper-shv" onMouseLeave={this.closeMenu}>
            <FlatButton label="Search Hypers" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '90%', margin: '0 0 5% 5%'}} fullWidth="true" disabled={true}/>
            <div className="wrapper" style={{width: '96%', margin: '0 0 2% 2%'}}>
              <Checkbox onClick={this.setSelf} style={{float: "left"}}/> Show only my Hypers
              <br/>
              <TextField style={{width: '96%', margin: '0 0 2% 2%'}} hintText="Search Hypers" ref="hyperInput" onClick={this.forceFocus} onChange={this.elasticSearch}/>
              {store.getState().searchedHypers.searchedHypers ? store.getState().searchedHypers.searchedHypers.slice(0, 4).map((hyper) => {
                return (
                  <a href={hyper._source.url} target="_blank" style={{width: '96%', margin: '0 0 2% 2%'}}> 
                    <MenuItem focusState="none" disableAutoFocus={true}>
                      <div className="search-hyper-results">
                        <p className="search-hyper-title">{hyper._source.title}</p>
                        <p className="search-hyper-username"><h5>Submitted by:</h5><h4>{hyper._source.username}</h4></p>
                        <p className="search-hyper-description">{hyper._source.description}</p>
                      </div>
                    </MenuItem>
                  </a>
                );
              }) : null}
            </div>
          </div>
        </IconMenu>
      </div> 
    );
  }
}

export default HyperSearch;