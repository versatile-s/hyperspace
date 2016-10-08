
import React, {Component} from 'react';
import Side from './side';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import store from '../../store';
import {connect} from 'react-redux';
import MyCategories from './myCategories';

class Category extends Component {
  constructor (props) {
    super(props);
    this.categoryCall = this.categoryCall.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.updateViews = this.updateViews.bind(this);
    this.sortData = this.sortData.bind(this);
    var context = this;
    store.subscribe(()=>{
      context.forceUpdate();
    });
  }

  componentWillMount () {
    this.props.categoryCall(this.props.params.user, this.props.params.category);
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
        username: this.props.params.user,
        title: item.title,
        views: item.views
      })
    }).then(function(){
      context.sortData(store.getState().data.data);
    });
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

  render () {
    { var context = this;  }
    return (
      <div>
        <div className="categoryPageContainer">
            {store.getState().data.data.map(function (item) {
              return (
                <div className="hyper" style={{order: item.views}} onClick={()=>context.updateViews(item)}>
                  <a href={item.url} target="_blank">
                    <Card>
                    <CardMedia overlay={<CardTitle titleStyle={{fontSize: 10, wordWrap: "break-word",lineHeight: 1.1}} title={item.title} subtitle={item.description}/>}>
                      {item.image.length > 3 ? <img className="hyperImage" src={item.image}/> : <div className={context.randomizeGradient()} style={{height: 100}}/>}
                    </CardMedia>
                    </Card>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Category;