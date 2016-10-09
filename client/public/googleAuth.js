// var onSignIn = function(googleUser) {
//   // Useful data for your client-side scripts:
//   console.log("OK OUR ONSIGNIN FUNC IS BEING CALLED")
//import store from './../store';

  var login = function(googleUser) {
    var profile = googleUser.getBasicProfile();
    var ID = profile.getId(); // Don't send this directly to your server!
    var fullName = profile.getName();
    var firstName = profile.getGivenName();
    var lastName = profile.getFamilyName();
    var photoUrl = profile.getImageUrl();
    var email = profile.getEmail();
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    //e.preventDefault();
    fetch('/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: fullName,
        password: ID
      })
    }).then((response) => {
      response.text().then((res) => {
        if (res === 'Login successful!') {
          store.dispatch({type: 'AUTH_SUCCESS', payload: true});
          store.dispatch({type: 'USERNAME_UPDATE', payload: context.state.username});
          context.setState({
            failedLogin: false
          });
          context.props.history.username = context.state.username;
          context.props.history.push('/'+context.state.username+'/home');
        } else {
          store.dispatch({type: 'AUTH_FAIL', payload: false});
          context.setState({
            failedLogin: true
          });
        }
      });
    })
    .catch((error) => {
      error.text().then((err) => {
        console.log(err);
      });
    });
  };

  var signup = function(googleUser) {
    var profile = googleUser.getBasicProfile();
    var ID = profile.getId(); // Don't send this directly to your server!
    var fullName = profile.getName();
    var firstName = profile.getGivenName();
    var lastName = profile.getFamilyName();
    var photo = profile.getImageUrl();
    var email = profile.getEmail();
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    //e.preventDefault();
    console.log('OK SIGNUP BEING CALLED')
    fetch('/signup', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: fullName,
        password: ID,
        firstName: firstName,
        lastName: lastName,
        photo: photo,
        email: email
      })
    }).then((response) => {
      response.text().then((res)=>{
        console.log('ok so res is ', res);
        if (res === 'Login successful!') {
          store.dispatch({type: 'USERNAME_UPDATE', payload: context.state.username});
          store.dispatch({type: 'AUTH_SUCCESS', payload: true});
          context.setState({
            failedSignin: false
          });
          context.props.history.username = context.state.username;
          context.props.history.push('/dashboard');
        } else {
          store.dispatch({type: 'AUTH_FAIL', payload: false});
          context.setState({
            failedSignin: true
          });
        }
      });
    })
    .catch((error) => {
      error.text().then((err)=>{
        console.log(err);
      });
    });
  };
