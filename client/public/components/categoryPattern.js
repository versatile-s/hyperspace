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
import MyCategories from './userCategories';
import EditHyper from './editHyper';
import FriendFeed from './friendFeed.js';
import Sunburst from './sunburst.js';
import SearchBar from './searchbar';
import Spinner from './loading';

class Category extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.params.user,
      categoryTitle: this.props.params.category,
      data: [],
      loading: true
    };

    var context = this;
    store.subscribe(() => {
      context.setState({
        data: store.getState().data.data
      }, function() {
        context.forceUpdate();
      });
    });

    this.updateViews = this.updateViews.bind(this);
    this.sortData = this.sortData.bind(this);
    this.filterContent = this.filterContent.bind(this);
    this.categoryPageCategoryCall=this.categoryPageCategoryCall.bind(this);

    props.categoryCall(props.params.user, props.params.category);
    props.getCategory(props.params.user, props.params.category);
  }

  componentWillReceiveProps (newProps) {
    var context = this;
    if (this.props.params.user !== newProps.params.user || this.props.params.category !== newProps.params.category) {
      this.setState({
        loading: true
      }, function () {
        context.props.categoryCall(newProps.params.user, newProps.params.category);
        context.props.getCategory(newProps.params.user, newProps.params.category);
      });
    }
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

    // this splicer function iterates over 
    // an array and slices each item to the
    // length of a provided string, which 
    // is then tested for comparison, returns
    // a bool value
    var splicer = function(array, target) {
      var size = target.length;
      for(var i = 0; i < array.length; i++) {
        if (array[i].slice(0, size) === target) {
          return true;
        }
      }
      return false;
    };

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
            cur.kScore += .17;
          } else if (tags.indexOf(q[i]) > -1 && tags !== '' && q[i] !== '') {
            cur.kScore += .13;
          } else if (description.indexOf(q[i]) > -1 && description !== '' && q[i] !== '') {
            cur.kScore += .11;
          } else if (splicer(title, q[i]) && title !== '' && q[i] !== '') {
            cur.kScore += .07;
          } else if (splicer(tags, q[i]) && tags !== '' && q[i] !== '') {
            cur.kScore += .05;
          } else if (splicer(description, q[i]) && description !== '' && q[i] !== '') {
            cur.kScore += .03;
          }
        }
        cur.kScore = cur.kScore.toFixed(2);
        if (cur.kScore > 0.00) {
          pre.push(cur);
        }
        return pre;
      }, []);
      result.sort((a, b) => a.kScore < b.kScore ? 1 : -1);
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

  componentWillUnmount() {
    console.log("Goodbye");
  }

  categoryPageCategoryCall() {
    this.setState({
      loading: true
    });
    this.props.categoryCall(this.props.params.user, this.props.params.category);
    this.props.getCategory(this.props.params.user, this.props.params.category);
  }

  render () {
    var context = this;
    var hint = 'Search ' + this.props.params.user + '\'s ' + this.props.params.category + ' stash';
    var color1 = store.getState().categoryInfo.categoryInfo.headerTextBackgroundColor;
    var color2 = store.getState().categoryInfo.categoryInfo.headerTextColor;
    var font = store.getState().categoryInfo.categoryInfo.fontFamily;
    var fontSize = store.getState().categoryInfo.categoryInfo.fontSize;
    var textAlign = store.getState().categoryInfo.categoryInfo.textAlign;
    if (this.state.loading) {
      setTimeout(function () {
        context.setState({
          loading: false
        });
      }, 1100);
    }
    return (


      this.state.loading === true ? 
        <Spinner style={{margin: "-20px 0 0 0"}}/> : 
        <div className="catBody">
          <div className="lowerHead" style={{background:color1, textAlign:textAlign}}>
            <span style={{fontFamily: font, color: color2, fontSize:fontSize}}>{store.getState().categoryInfo.categoryInfo.headerText || 'You are here: ' + this.props.params.category}</span>
            <TextField hintText={hint} className="filter-content-textbox filter-conten" ref="filterSearch" onChange={this.filterContent}/>
          </div>

          <div className="row">
            <FriendFeed/>
            <Sunburst categoryCall={context.props.categoryCall} getCategory={context.props.getCategory}/>
          </div>
          <div className="categoryPageContainer row">
          
            <SearchBar />
            <div className="row">
              {context.state.data.map(function (item) {
                return (
                  <div className="hyper col-md-3" style={{order: item.views}} >
                    <EditHyper params={context.props.params} categoryCall={context.categoryPageCategoryCall} item={item}/>
                    <a href={item.url} target="_blank">

                      <Card onClick={()=>context.updateViews(item)}>
                        <div className="hyperBG" style={{background: 'url(' + item.image + ')'}}>
                        </div>
                        <CardMedia className="hyperMediaHead" overlay={<CardTitle titleStyle={{fontSize: 10, wordWrap: "break-word",lineHeight: 1.1}} title={item.title} subtitle={item.description}/>}>
                          {item.image.length > 3 ? <img className="hyperImage" style={{minWidth:'none'}} src={item.image}/> : <div className={context.randomizeGradient()} style={{height: 175}}/>}
                        </CardMedia>
                      </Card>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    );
  }
}

export default Category;