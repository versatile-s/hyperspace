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
    console.log("componentWillMount--frame");
    this.categoryCall(this.props.params.user, this.props.params.category);
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
        if (Array.isArray(data)) {
          context.sortData(data);
        } else {
          store.dispatch({
            type: "GET_DATA", payload:[{title: "This category doesnt seem to have any links yet!"}]
          });
        }
      });
    });
  }

  render () {
    return (
      <div>
        <Side categoryCall={this.categoryCall} params={this.props.params} category={this.state.categoryTitle} setCategory={this.setCategory} username={this.state.username}/>  
        <FlatButton label="H   Y   P   E   R   S   P   A   C   E" labelStyle={{textAlign: 'center', fontSize: 100}} style={{width: '100%', height: 70}} fullWidth="true" disabled={true}/>
        <FlatButton label={this.props.params.user?this.props.params.user + "  -  " + this.props.params.category:"WELCOME TO HYPERSPACE"} labelStyle={{textAlign: 'center', fontSize: 15, letterSpacing: 2}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
        <div>
            {React.cloneElement(this.props.children,{categoryCall: this.categoryCall})}
        </div>
      </div>
    );
  }
}

export default Frame;