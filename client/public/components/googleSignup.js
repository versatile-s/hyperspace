// import React, {Component} from 'react';
// import store from '../../store';
// import google from '.googleapis';

// class GoogleSignup extends Component {
//   constructor (props) {
//     super(props);
//     this.signup = this.signup.bind(this);
//     //store.dispatch({type: 'OPEN', payload: true});
//   }

//   // The 'e' here should represent a google user
//   signup (e) {
//     e.preventDefault();
//     console.log("OK AT LEST BEING CALLED");
//     var profile = google.googleUser.getBasicProfile();
//     console.log("ID: " + google.profile.getId()); // Don't send this directly to your server!
//     // console.log('Full Name: ' + profile.getName());
//     // console.log('Given Name: ' + profile.getGivenName());
//     // console.log('Family Name: ' + profile.getFamilyName());
//     // console.log("Image URL: " + profile.getImageUrl());
//     // console.log("Email: " + profile.getEmail());
//     // var id_token = googleUser.getAuthResponse().id_token;
//     // console.log("ID Token: " + id_token);
//     // var context = this;
//     // fetch('/signup', {
//     //   method: 'POST',
//     //   credentials: 'same-origin',
//     //   headers: {
//     //     //'Accept': 'application/json',
//     //     'Content-Type': 'application/json'
//     //   },
//     //   body: JSON.stringify({
//     //     username: this.state.username,
//     //     password: this.state.password
//     //   })
//     // }).then((response) => {
//     //   response.text().then((res)=>{
//     //     if (res === 'Login successful!') {
//     //       store.dispatch({type: 'USERNAME_UPDATE', payload: context.state.username});
//     //       store.dispatch({type: 'AUTH_SUCCESS', payload: true});
//     //       context.setState({
//     //         failedSignin: false
//     //       });
//     //       context.props.history.username = context.state.username;
//     //       context.props.history.push('/dashboard');
//     //     } else {
//     //       store.dispatch({type: 'AUTH_FAIL', payload: false});
//     //       context.setState({
//     //         failedSignin: true
//     //       });
//     //     }
//     //   });
//     // })
//     // .catch((error) => {
//     //   error.text().then((err)=>{
//     //     console.log(err);
//     //   });
//     // });
//   }

//   render() {
//     return (
//       <div>
//         <script src="https://apis.google.com/js/platform.js" async defer></script>
//         <div className="g-signin2" onClick={this.signup} data-onsuccess={this.signup} data-theme="dark"></div>
//       </div>
//     );
//   }
// }

// //


// export default GoogleSignup;