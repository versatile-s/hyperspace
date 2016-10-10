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
      method: 'POST',
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
    return (
      <div className="friendFeed">
        {store.getState().data.data.map(function (item) {
          return (
            <div className="feedHyper">
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
    );
  }
}

export default FriendFeed;