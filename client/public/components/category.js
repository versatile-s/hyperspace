
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

import EditHyper from './editHyper';

import FriendFeed from './friendFeed.js';


class Category extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: this.props.params.user,
      categoryTitle: this.props.params.category,
      data: [],
      // currentVisitor: 'guest'
    };
    // this.isAuth = this.isAuth.bind(this);
    // this.categoryCall = this.categoryCall.bind(this);

    this.updateViews = this.updateViews.bind(this);
    this.sortData = this.sortData.bind(this);
    this.categoryPageCategoryCall=this.categoryPageCategoryCall.bind(this);


    var context = this;
    store.subscribe(() => {
      context.forceUpdate();
    });
  }

  componentWillMount () {
    this.props.categoryCall(this.props.params.user, this.props.params.category);
    this.props.getCategory(this.props.params.user, this.props.params.category);
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
  componentWillUnmount(){
    console.log("Goodbye");
  }


  categoryPageCategoryCall(){
    this.props.categoryCall(this.props.params.user, this.props.params.category);
    this.props.getCategory(this.props.params.user, this.props.params.category);
  }

  // categoryCall () {
  //   // var context = this;
  //   // console.log("categorycall params",this.state.username,this.state.categoryTitle);
  //   // fetch('/categoryData', {
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Accept': 'application/json',
  //   //     'Content-Type': 'application/json'
  //   //   },
  //   //   body: JSON.stringify({
  //   //     username: this.state.username,
  //   //     categoryTitle: this.state.categoryTitle
  //   //   })
  //   // }).then((response) => {
  //   //   console.log("response from categoryCall",response);
  //   //   response.json().then(function (data) {

  //   //     if (Array.isArray(data)) {
           
  //   //       context.sortData(data);
          
  //   //     } else {
  //   //       store.dispatch({
  //   //         type: "GET_DATA", payload:[{title: "This category doesnt seem to have any links yet!"}]
  //   //       });
  //   //     }
  //   //   });
  //   // });
  // }



  render () {
    { var context = this; }
    return (
      <div>
        <div style={{backgroundImage: "url("+store.getState().categoryInfo.categoryInfo.backgroundUrl+")"}} className="categoryPageContainer">
          <FriendFeed />
            {store.getState().data.data.map(function (item) {
              return (
                <div className="hyper" style={{order: item.views}} >
                  <EditHyper params={context.props.params} categoryCall={context.categoryPageCategoryCall} item={item}/>
                  <a href={item.url} target="_blank">

                    <Card onClick={()=>context.updateViews(item)}>
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