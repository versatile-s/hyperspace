
import React, {Component} from 'react';
import Side from './side';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import store from '../../store';

class Category extends Component {
  constructor (props) {
    super(props);
    this.state = {
      viewedUser: this.props.params.user,
      viewedCat: this.props.params.category,
      data: []
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
      viewedCat: category
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
        username: context.props.params.user,
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
        username: context.props.params.user,
        categoryTitle: context.props.params.category
      })
    }).then((response) => {
      response.json().then(function (data) {
        if (Array.isArray(data)) {
          context.setState({
            viewedUser: context.props.params.user,
            viewedCat: context.props.params.category,
            data: data
          }, function () {
            context.sortData();
          });
        } else {
          context.setState({
            viewedUser: context.props.params.user,
            viewedCat: context.props.params.category,
            data: [{title: "This category doesnt seem to have any links yet!"}]
          });
        }
      });
    });
  }

  render () {
    { var context = this; this.randomizeGradient(); }
    return (
      <div>        
        <div className="categoryPageContainer">
            {this.state.data.map(function (item) {
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