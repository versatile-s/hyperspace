import React from 'react';
import ReactDOM from 'react-dom';
import App from './public/app';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('content'));
// ReactDOM.render(<App />, document.getElementById('content'));

// var onSignIn = function(googleUser) {
//   // Useful data for your client-side scripts:
//   console.log("OK OUR ONSIGNIN FUNC IS BEING CALLED")
//   var profile = googleUser.getBasicProfile();
//   var ID = profile.getId(); // Don't send this directly to your server!
//   var fullName = profile.getName();
//   var firstName = profile.getGivenName();
//   var lastName = profile.getFamilyName();
//   var photoUrl = profile.getImageUrl();
//   var email = profile.getEmail();
//   // The ID token you need to pass to your backend:
//   var id_token = googleUser.getAuthResponse().id_token;

//   var signup = function(e) {
//     //e.preventDefault();
//     fetch('/signup', {
//       method: 'POST',
//       credentials: 'same-origin',
//       headers: {
//         //'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         username: profile.getName(),
//         password: profile.getId()
//       })
//     }).then((response) => {
//       response.text().then((res)=>{
//         console.log('ok so res is ', res);
//         if (res === 'Login successful!') {
//           store.dispatch({type: 'USERNAME_UPDATE', payload: context.state.username});
//           store.dispatch({type: 'AUTH_SUCCESS', payload: true});
//           context.setState({
//             failedSignin: false
//           });
//           context.props.history.username = context.state.username;
//           context.props.history.push('/dashboard');
//         } else {
//           store.dispatch({type: 'AUTH_FAIL', payload: false});
//           context.setState({
//             failedSignin: true
//           });
//         }
//       });
//     })
//     .catch((error) => {
//       error.text().then((err)=>{
//         console.log(err);
//       });
//     });
//   };
//   signup();
// };

// ReactDOM.render(<App />, document.getElementById('content'));
