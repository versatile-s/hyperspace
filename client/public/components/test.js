import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Test extends Component {
  constructor (props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.putUsers = this.putUsers.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.postCategories = this.postCategories.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.postCategory = this.postCategory.bind(this);
    this.putCategory = this.putCategory.bind(this);
    this.addTag = this.addTag.bind(this);
    this.addLink = this.addLink.bind(this);
    this.editLink = this.editLink.bind(this);
    this.searchLinks = this.searchLinks.bind(this);
    this.getHome = this.getHome.bind(this);
    this.viewPreferences = this.viewPreferences.bind(this);
    this.editPreferences = this.editPreferences.bind(this);
    this.else = this.else.bind(this);
  }

  signup (e) {
    e.preventDefault();
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  login (e) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  logout (e) {
    e.preventDefault();
    fetch('/logout', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        console.log('you have been logged out');
      }
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  putUsers (e) {
    e.preventDefault();
    fetch('/users', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  getCategories (e) {
    e.preventDefault();
    fetch('/categories', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  postCategories (e) {
    e.preventDefault();
    fetch('/categories', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  getCategory (e) {
    e.preventDefault();
    fetch('/category', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  postCategory (e) {
    e.preventDefault();
    fetch('/category', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  putCategory (e) {
    e.preventDefault();
    fetch('/category', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  addTag (e) {
    e.preventDefault();
    fetch('/addTag', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  addLink (e) {
    e.preventDefault();
    fetch('/link', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  editLink (e) {
    e.preventDefault();
    fetch('/link', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  searchLinks (e) {
    e.preventDefault();
    fetch('/searchLinks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  getHome (e) {
    e.preventDefault();
    fetch('/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  viewPreferences (e) {
    e.preventDefault();
    fetch('/preferences', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  editPreferences (e) {
    e.preventDefault();
    fetch('/preferences', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  else (e) {
    e.preventDefault();
    fetch('/kiraknowsbest', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  render () {
    return (
      <div>
        <input type="button" value="POST at /signup" onClick={this.signup} />
        <input type="button" value="POST at /login" onClick={this.login} />
        <input type="button" value="DELETE at /logout" onClick={this.logout} />
        <input type="button" value="PUT at /users" onClick={this.putUsers} />
        <input type="button" value="GET at /categories" onClick={this.getCategories} />
        <input type="button" value="POST at /categories" onClick={this.postCategories} />
        <input type="button" value="GET at /category" onClick={this.getCategory} />
        <input type="button" value="POST at /category" onClick={this.postCategory} />
        <input type="button" value="PUT at /category" onClick={this.putCategory} />
        <input type="button" value="POST at /addTag" onClick={this.addTag} />
        <input type="button" value="POST at /link" onClick={this.addLink} />
        <input type="button" value="PUT at /link" onClick={this.editLink} />
        <input type="button" value="POST at /searchLinks" onClick={this.searchLinks} />
        <input type="button" value="GET at /" onClick={this.getHome} />
        <input type="button" value="GET at /preferences" onClick={this.viewPreferences} />
        <input type="button" value="PUT at /preferences" onClick={this.editPreferences} />
        <input type="button" value="GET at /kiraknowsbest" onClick={this.else} />
      </div>
    );
  }
}

