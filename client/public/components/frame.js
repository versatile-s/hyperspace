import React, {Component} from 'react';
import Side from './side';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import store from '../../store';

class Frame extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    };
    this.categoryCall = this.categoryCall.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.updateViews = this.updateViews.bind(this);
    this.sortData = this.sortData.bind(this);
    this.hardRender = this.hardRender.bind(this);
  }

  componentWillMount () {
    this.categoryCall(this.props.params.user, this.props.params.category);
    console.log("user params:",this.props.params.user);
  }

  setCategory(category) {
    var context = this;
    this.setState({
      categoryTitle: category
    },
    function() {
      context.categoryCall(context.props.params.user, context.props.params.category);
    });
  }

  updateViews (item) {
    var context = this;
    item.views +=1;
    fetch('/link', {
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        title: item.title,
        views: item.views
      })
    }).then(function(){
      context.sortData();
    });
  }
  hardRender(){
    this.children.forceUpdate();
  }

  sortData (responseData) {
    var tempData = responseData.sort(function (a, b) {
      return b.views - a.views;
    });
    store.dispatch({type: "GET_DATA", payload: tempData});
  }

  randomizeGradient () {
    let random = Math.ceil(Math.random() * 25);
    return 'gradient' + random;
  }

  categoryCall (username, category) {
    var context = this;
    store.dispatch({
      type: "GET_DATA", payload:[]
    });
    if (username && username !== '') {
      fetch('/categoryData', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          categoryTitle: category
        })
      }).then((response) => {
        response.json().then(function (data) {
          if (data === 'Error') {
            store.dispatch({
              type: "GET_DATA", payload:[{title: "There seems to be a problem with your request.", description: "The requested page may have been deleted or the user no longer exists.", image: []}]
            });
          } else if (Array.isArray(data)) {
            context.sortData(data);
          } else {
            store.dispatch({
              type: "GET_DATA", payload:[{title: "This category doesnt seem to have any links yet!", description: "Make sure you get the Hyprspace Chrome Extension to start adding Hypers!", image: []}]
            });
          }
        });
      });
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <div className="logo">hyprspace</div>
        </div>
        <div className="sideMenu">
          <Side categoryCall={this.categoryCall} params={this.props.params} category={this.state.categoryTitle} setCategory={this.setCategory} username={this.state.username}/>  
        </div>
        <div className="mainContent">
            {React.cloneElement(this.props.children, {categoryCall: this.categoryCall})}
        </div>
        <div className="footer" />
      </div>
    );
  }
}

export default Frame;