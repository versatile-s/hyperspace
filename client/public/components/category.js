
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
import FriendFeed from './friendFeed.js';

class Category extends Component {
  constructor (props) {
    super(props);
    this.updateViews = this.updateViews.bind(this);
    this.sortData = this.sortData.bind(this);
    this.focused = this.focused.bind(this);
    this.filterContent = this.filterContent.bind(this);
    var context = this;
    this.state = {
      data: []
    };
    store.subscribe(() => {
      context.setState({
        data: store.getState().data.data
      }, function() {
        context.forceUpdate();
      });
    });
  }

  componentWillMount () {
    this.props.categoryCall(this.props.params.user, this.props.params.category);
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

  filterContent (e) {
    var hypers = store.getState().data.data;
    if (e.target.value !== '') {
      var context = this;
      var q = e.target.value.toLowerCase().split(' ');
      var result = hypers.reduce((pre, cur) => {
        var title = cur.title.toLowerCase().split(' ');
        var description = cur.description.toLowerCase().split(' ');
        var tags = cur.tags.toLowerCase().split(' ');
        cur.kScore = 0;
        for (var i = 0; i < q.length; i++) {
          if (title.indexOf(q[i]) > -1 && title !== '' && q[i] !== '') {
            console.log('pre 1', pre);
            cur.kScore += .11;
            pre.push(cur);
          } else if (tags.indexOf(q[i]) > -1 && tags !== '' && q[i] !== '') {
            console.log('pre 3', pre);
            cur.kScore += .07;
            pre.push(cur);
          } else if (description.indexOf(q[i]) > -1 && description !== '' && q[i] !== '') {
            console.log('pre 2', pre);
            cur.kScore += .03;
            pre.push(cur);
          }
        }
        return pre;
      }, []);
      result.sort((a, b) => a.kScore < b.kScore ? 1 : -1);
      console.log('result after kScore sorting: ', result.map((item) => item.kScore));
      this.setState({
        data: result
      });
    } else {
      this.setState({
        data: hypers
      });
    }
  }

  sortData (responseData) {
    var tempData = responseData.sort(function (a, b) {
      return b.views - a.views;
    });
    store.dispatch({type: 'GET_DATA', payload: tempData});
  }

  randomizeGradient () {
    let random = Math.ceil(Math.random() * 25);
    return 'gradient' + random;
  }

  render () {
    { var context = this; }
    { var hint = 'Search ' + this.props.params.user + '\'s ' + this.props.params.category + ' stash'; }
    return (
      <div>
        <TextField hintText={hint} className="filter-content-textbox filter-conten" ref="filterSearch" onChange={this.filterContent}/>
        <div className="categoryPageContainer">
          <FriendFeed />
            {context.state.data.map(function (item) {
              return (
                <div className="hyper" style={{order: item.views}} onClick={()=>context.updateViews(item)}>
                  <a href={item.url} target="_blank">
                    <Card>
                    <CardMedia overlay={<CardTitle titleStyle={{fontSize: 10, wordWrap: 'break-word', lineHeight: 1.1}} title={item.title} subtitle={item.description}/>}>
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