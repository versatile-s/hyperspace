import React, {Component} from 'react';


class UserSignIn extends Component {
  constructor (props) {
    super(props);

    this.state = {
      authenticated: false,
      username: ''
    };

    this.authenticateUser = this.authenticateUser.bind(this);
  }

  authenticateUser(e) {
    var context = this;
    console.log('CONTEXT HERE IS', this);
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var authenticated = false;

    var toSend = {username: username, password: password};
    
    // second, true argument below means send async
    xhr.open('POST', 'http://127.0.0.1:3000/login', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(encodeURI('username=' + username + '&password=' + password));
    // xhr.send(JSON.stringify({username: username, password: password}));

    console.log('username and pass are', username + password);
    xhr.onreadystatechange = function () {
      console.log('status here is', this.status);
      console.log('we received a change in status!');
      if (this.status === 200 ) {
        context.setState({
          authenticated: true,
          username: username
        });
        console.log('authenticated val is now', context.state.authenticated);
      } else {
        context.setState({
          authenticated: false,
          username: username
        });
        console.log ('authenticated val is now', context.state.authenticated);
      }
    };
  }

  render () {
    return (
      <div className="authBody">
        <h2>Welcome to hyperspace. Please login.</h2>
        <form className="authForm">
          <input id="username"/>
          <input id="password" type="password"/>
          <button onClick={this.authenticateUser} className="submit">log in</button>
        </form>
      </div>
    );
  }
}

export default UserSignIn;



      
    //     <div class="authBody" style="margin-top:30px; text-align:center;">
    //     <div id="text" style="font-weight: 100 !Important; font-family: Roboto; text-align: center;">Welcome to hyperspace. Please login.</div>
    //   <form class="userLogin" style="margin-top:30px;">
    //     <input id="username" value="" placeholder="your username" type="text" style="line-height: 24px;
    // font-size: 16px;
    // width: 240px;
    // text-align: center;
    // font-family: Roboto;
    // font-weight: 400;
    // border-radius: 32px;
    // border: none; height: 40px;">
    //     <input id="password" value="" placeholder="password" type="password" style="line-height: 24px;
    // font-size: 16px;
    // width: 240px;
    // text-align: center;
    // font-family: Roboto;
    // font-weight: 400;
    // border-radius: 32px;
    // border: none; height: 40px; margin-top: 15px;">
    //     <div class="submit" style="text-align:right;">
    //       <button class="submit" id="submit" style="border-radius: 0px !important;
    // background: none;
    // border: 1px solid #000;
    // padding: 7px 20px;
    // margin-right: 40px;
    // margin-top: 20px; margin-bottom: 20px;">log in :)</button>
    //     </div>
    //     </div>