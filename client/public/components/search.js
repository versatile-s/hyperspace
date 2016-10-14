
import React, {Component} from 'react';
import Side from './side';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import store from '../../store';
import MyCategories from './userCategories';

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResults: []
    };
    this.updateViews = this.updateViews.bind(this);
    this.elasticSearch = this.elasticSearch.bind(this);
  }

  updateViews (item) {
    console.log(item.username);
    var context = this;
    item.views +=1;
    fetch('/link', {
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: item.username,
        title: item.title,
        views: item.views
      })
    });
  }

  elasticSearch (e) {
    e.preventDefault();
    var context = this;
    var text = e.target.value;
    fetch('/searchLinks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text
      })
    }).then(function (res) {
      res.json().then(function (data) { 
        context.setState({
          searchResults: data
        });
      });
    });
    console.log('this state: ', this.state);
  }

  forceFocus(){
    this.refs.hyperInputSearch.focus();
  }

  randomizeGradient () {
    let random = Math.ceil(Math.random() * 25);
    return 'gradient' + random;
  }

  render () {
    { var context = this;  }
    return (
      <div>
      <TextField hintText="Search Hyprspace" ref="hyperInputSearch" onClick={this.forceFocus} onChange={this.elasticSearch}/>
        <div className="categoryPageContainer">
            {this.state.searchResults.map(function (item) {
              return (
                <div className="hyper-searched" style={{order: item._source.views}} onClick={()=>context.updateViews(item._source)}>
                  <a href={item._source.url} target="_blank">
                    <Card>
                    <CardMedia overlay={<CardTitle titleStyle={{fontSize: 10, wordWrap: "break-word",lineHeight: 1.1}} title={item._source.title} subtitle={item._source.description}/>}>
                      {item._source.image.length > 3 ? <img className="hyperImage" src={item._source.image} /> : <div className={context.randomizeGradient()} style={{height: 100}}/>}
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

export default Search;