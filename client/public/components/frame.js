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
      username: this.props.params.user,
      categoryTitle: this.props.params.category,
      data: [],
      // currentVisitor: 'guest'
    };
    // this.isAuth = this.isAuth.bind(this);
    this.categoryCall = this.categoryCall.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.updateViews = this.updateViews.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  componentWillMount () {
    this.categoryCall();
  }

  setCategory(category) {
    var context = this;
    this.setState({
      categoryTitle: category
    },
    function() {
      context.categoryCall();
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

  sortData () {
    var context = this;
    var tempData = this.state.data.sort(function (a, b) {
      return b.views - a.views;
    });
    this.setState({
      data: tempData
    });
  }

  randomizeGradient () {
    console.log('FIRING GRADIENT');

    let random = Math.ceil(Math.random() * 25);

    return 'gradient' + random;
  }


  categoryCall () {
    var context = this;
    fetch('/categoryData', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        categoryTitle: this.state.categoryTitle
      })
    }).then((response) => {
      response.json().then(function (data) {
        if (Array.isArray(data)) {
          context.setState({
            data: data
          }, function () {
            context.sortData();
          });
        } else {
          context.setState({
            data: [{title: "This category doesnt seem to have any links yet!"}]
          });
        }
      });
    });
  }


  render () {
    { var context = this; this.randomizeGradient();}
    return (
      <div>
        <Side category={this.state.categoryTitle} setCategory={this.setCategory} username={this.state.username}/>  
        <FlatButton label="H   Y   P   E   R   S   P   A   C   E" labelStyle={{textAlign: 'center', fontSize: 100}} style={{width: '100%', height: 70}} fullWidth="true" disabled={true}/>
        <FlatButton label={this.state.username + "  -  " + this.state.categoryTitle} labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
        <div>
            {this.props.children}
        </div>
      </div>
    );
  }
}



export default Frame;