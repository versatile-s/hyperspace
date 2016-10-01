import React, {Component} from 'react';

class HyperspaceWorker extends Component {
  constructor (props) {
    super(props);

    this.state = {
      authenticated: true,
      username: '',
      url: null,
      title: null,
      category: '',
      tags: ''
    };

    this.sendLink = this.sendLink.bind(this);
  }

  componentWillMount() {
    this.setState({
      username: this.props.username
    });

    // hit DB and pull categories for given user
    let request = new XMLHttpRequest();
    let url = 'http:127.0.0.1:3000/usercategories';
    let params = '?username=' + this.props.username;
    console.log('USERNAME BEING SENT TO /USERCAT IS', params);
    console.log('sending GET on willMount');
    request.onreadystatechange = function () {
      console.log('we performed GET req and this is what we are receiving in return:', this.responseText);
    };
    request.open('GET', url + params, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(encodeURI());

  }

  sendLink (e) {
    e.preventDefault();
    
    let username = this.state.username;

    let getCurrentTabUrl = function () {
      let queryInfo = {
        active: true,
        currentWindow: true
      };

      chrome.tabs.query(queryInfo, function (tabs) {
        let tab = tabs[0];
        let url = tab.url;
        let title = tab.title;
        let category = document.getElementById('category').value;
        let tags = document.getElementById('tags').value;

        let request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:3000/link', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(encodeURI('url=' + url + '&title=' + title + '&category=' + category + '&tags=' + tags + '&username=' + username));
      });
    };

    getCurrentTabUrl();
  }

  render () {
    return (
      <div className="workerBody">
        <h5 className="welcome">welcome, {this.state.username}</h5>
        <p className="workerPrompt">add to your hyperspace:</p>
        <h3 className="hyperUrl"></h3>
        <form className="addLinkForm">
          <input id="category" placeholder="hyper category" />
          <input id="tags" placeholder="hyper tags"/>
          <button onClick={this.sendLink} className="addTo">add to hyperspace</button>
        </form>
        <button className="logOut" onClick={this.props.logOutUser}>logout</button>
      </div>
    );
  }
}

export default HyperspaceWorker;