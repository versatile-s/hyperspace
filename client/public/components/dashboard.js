import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';


class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.history.username,
      category: 'home'
    };
    this.createHome = this.createHome.bind(this);

  }
  createHome() {
    fetch('/category', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.category
      })
    }).then(browserHistory.push('/' + this.state.username + "/home"));


    // browserHistory.push("/" + this.state.username + "/home");

  }

  render () {
    return (
      <div className="dashContainer">

        <FlatButton label="H   Y   P   E   R   S   P   A   C   E" labelStyle={{textAlign: 'center', fontSize: 100}} style={{width: '100%', height: 70}} fullWidth="true" disabled={true}/>
        
        <div className="dashboardPaperContainer">
          <Paper className="dashboardPaperL" zDepth={5} >
          
            <FlatButton onClick={this.createHome} labelStyle={{fontSize: 30}} style={{height: "20%",width:"100%"}} label=""/>
            <FlatButton onClick={this.createHome} labelStyle={{fontSize: 30}} style={{height: "20%",width:"100%"}} label="Create"/>
            <FlatButton onClick={this.createHome} labelStyle={{fontSize: 30}} style={{height: "20%",width:"100%"}} label="My   First"/>
            <FlatButton onClick={this.createHome} labelStyle={{fontSize: 30}} style={{height: "20%",width:"100%"}} label="Home   Page"/>
            <FlatButton onClick={this.createHome} labelStyle={{fontSize: 30}} style={{height: "20%",width:"100%"}} label=""/>
          </Paper>

          <Paper className="dashboardPaperR" zDepth={5}>
          

          <div className="dashboard-welcome-info">
            <FlatButton label="" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <FlatButton label="Welcome to HYPERSPACE!" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <FlatButton label="Please install our Chrome extension first!" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <FlatButton label="It can be found HERE" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} fullWidth="true" disabled={false}/>
            <FlatButton label="Once that's installed, click " labelStyle={{textAlign: 'center'}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <FlatButton label="'Create My First Home Page!' to get started!" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <FlatButton label="Your homepage can be found at" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <FlatButton label={"hyprspace.me/"+this.state.username+"/home."} labelStyle={{textAlign: 'center'}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <FlatButton label="(You can go ahead and set it to your" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <FlatButton label="default home page in Chrome now!)" labelStyle={{textAlign: 'center'}} style={{width: '100%'}} fullWidth="true" disabled={true}/> 
          
          </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Dashboard;