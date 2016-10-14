import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import store from '../../store';

class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      category: 'home'
    };
    this.createHome = this.createHome.bind(this);
  }
  
  createHome() {
    var username = store.getState().username.username;
    fetch('/category', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        name: this.state.category,
        headerText: 'Home',
        headerTextColor: 'white',
        backgroundUrl: '',
        headerTextBackgroundColor: '#462565',
        fontFamily: 'Roboto',
        fontSize: 12,
        textAlign: 'center',
        sunburst: true,
        feed: true,
        searchBar: false
      })
    }).then(browserHistory.push('/' + username + "/home"));
  }

  render () {
    return (
      <div className="dashContainer">
        <div className="dashboardPaperContainer">
          <Paper className="dashboardPaperL" zDepth={5} >
            <FlatButton onClick={this.createHome} labelStyle={{fontSize: 30, textAlign: 'center'}} style={{height: "100%",width:"100%"}} label={store.getState().username.username + "! You can get started by clicking here!"}/>
           
          </Paper>
          <Paper className="dashboardPaperR" zDepth={5}>
          <div className="dashboard-welcome-info">
            <FlatButton label={"Hi, " + store.getState().username.username + "!"} labelStyle={{textAlign: 'center'}} style={{width: '100%'}} disabled={true}/>
            <FlatButton label="Welcome to HYPERSPACE!" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} disabled={true}/>
            <FlatButton label="Please install our Chrome extension first!" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} disabled={true}/>
            <FlatButton label="It can be found HERE" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} disabled={false}/>
            <FlatButton label="Once that's installed, click " labelStyle={{textAlign: 'center'}} style={{width: '100%'}} disabled={true}/>
            <FlatButton label="'Create My First Home Page!' to get started!" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} disabled={true}/>
            <FlatButton label="Your homepage can be found at" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} disabled={true}/>
            <FlatButton label={"hyprspace.me/"+store.getState().username.username+"/home."} labelStyle={{textAlign: 'center'}} style={{width: '100%'}} disabled={true}/>
            <FlatButton label="(You can go ahead and set it to your" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} disabled={true}/>
            <FlatButton label="default home page in Chrome now!)" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} disabled={true}/> 
          </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Dashboard;