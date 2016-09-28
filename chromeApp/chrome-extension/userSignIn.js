import React, {Component} from 'react';


class UserSignIn extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="authBody">
        <form className="authForm">
          <input id="username"/>
          <input id="password"/>
          <button onCLick={this.props.authenticateUser()} className="submit">log in</button>
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