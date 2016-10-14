import React, {Component} from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import LogoutIcon from 'material-ui/svg-icons/navigation/cancel';
import store from '../../store';

class Logout extends Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout (e) {
    e.preventDefault();
    var context = this;
    fetch('/logout', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        browserHistory.push('/');
        context.props.closeMenu();
        store.dispatch({type: 'EDIT_SWITCH', payload: false});
        store.dispatch({type: "CAT_INFO", payload: {}});
        store.dispatch({type: 'USERNAME_UPDATE', payload: ''});
        store.dispatch({type: 'AUTH_SUCCESS', payload: null});
        store.dispatch({type: 'GET_CATEGORIES', payload: []});
        store.dispatch({type: 'CAT_INFO', payload: {}});
        store.dispatch({type: 'GET_DATA', payload: []});
        store.dispatch({type: 'OPEN', payload: null});
        store.dispatch({type: 'S_HYPERS', payload: []});
        store.dispatch({type: 'SELF', payload: null});
        store.dispatch({type: 'TOGGLE_SWITCH', payload: null});
        store.dispatch({type: 'EDIT_SWITCH', payload: false});
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className="logout-knob">
        <IconButton onTouchTap={this.logout} iconStyle={{color:"white"}}><LogoutIcon /></IconButton>
      </div>
    );
  }
}

export default Logout;