import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import store from '../../store';
import {connect} from 'react-redux';
import MyCategories from './MyCategories';

class FriendFeed extends Component {
  constructor (props) {
    super(props);
  }

  updateViews (item) {
    var context = this;
    item.views += 1;
    fetch('/link', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.props.params.user,
        title: item.title,
        views: item.views
      })
    }).then(function() {
      context.sortData(store.getState().data.data);
    });
  }

  render () {
    { var context = this; }
  }

}