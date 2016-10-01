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
      tags: '',
      selections: []
    };

    this.sendLink = this.sendLink.bind(this);
  }

  componentWillMount() {
    this.setState({
      username: this.props.username
    });

    let context = this;

    // hit DB and pull categories for given user
    let request = new XMLHttpRequest();
    let url = 'http:127.0.0.1:3000/usercategories';
    let params = '?username=' + this.props.username;
    
    request.onreadystatechange = function () {
      
      // remove brackets, quotation marks and split on the comma to create new array
      let newThing = this.responseText.slice(1, -1).replace(/['"]+/g, '').split(',');
      
      // check categories received, push to selections if not already there
      newThing.forEach(function(category) {
        context.state.selections.indexOf(category) === -1 ? context.state.selections.push(category) : null;
      });      
    };
    
    request.open('GET', url + params, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send();
    console.log('STATE SELECT IS', this.state.selections);
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
          <select>
            <option
              {this.state.selections.map(function (category) {
                return category;
              });
              }
            />
          </select>
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