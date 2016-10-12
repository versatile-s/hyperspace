import React, {Component} from 'react';
import Side from './side';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import store from '../../store';
import EditCategory from './editCategory';

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

    this.getCategory = this.getCategory.bind(this);
    var context = this;
    store.subscribe(() => {
      context.forceUpdate();
    });

  }

  componentWillMount () {
    this.categoryCall(this.props.params.user, this.props.params.category);
    console.log("user params:",this.props.params.user);
    this.getCategory(this.props.params.user, this.props.params.category);
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

  getCategory (username, title) {
    fetch('/getCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        title: title
      })

    }).then(function(res) {
      res.json().then(function(parsedRes) {
        store.dispatch({type: "CAT_INFO", payload: parsedRes});
      });
    });
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
    {var color1 = store.getState().categoryInfo.categoryInfo.headerTextBackgroundColor;
      var color2 = store.getState().categoryInfo.categoryInfo.headerTextColor;
      var font = store.getState().categoryInfo.categoryInfo.fontFamily;
      var fontSize = store.getState().categoryInfo.categoryInfo.fontSize;
      var textAlign = store.getState().categoryInfo.categoryInfo.textAlign;
    }
    return (
      <div>
        <div style={{background:color1||"blue"}} className="header" >
          <EditCategory params={this.props.params} categoryCall={this.categoryCall} getCategory={this.getCategory}/>
          <div style={{color:color2||"white", fontFamily:font, fontSize: fontSize, textAlign:textAlign}} className="logo">{store.getState().categoryInfo.categoryInfo.headerText || "hyprspace"}</div>

        </div>
        <div className="sideMenu">
          <Side categoryCall={this.categoryCall} getCategory={this.getCategory} params={this.props.params}/>

        </div>
        <div className="mainContent">
            {React.cloneElement(this.props.children, {categoryCall: this.categoryCall, getCategory: this.getCategory})}
        </div>
        <div style={{background:color1|| "blue"}} className="footer" />
      </div>
    );
  }
}

export default Frame;