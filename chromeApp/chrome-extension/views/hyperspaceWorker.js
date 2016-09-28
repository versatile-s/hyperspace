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
  }

  sendLink (e) {
    e.preventDefault();
    var getCurrentTabUrl = function (callback) {
      var queryInfo = {
        active: true,
        currentWindow: true
      };

      chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;
        var title = tab.title;
        var category = null;
        var tags = null;

        var request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:3000/link', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(encodeURI('url=' + url + '&title=' + title + '&category=' + category + '&tags=' + tags));
      });
    };
    getCurrentTabUrl();

 /*   let url = tab.url;
    let title = tab.title;*/
/*
    let request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:3000/link', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(encodeURI('url=' + url + '&title=' + title + '&category=' + category + '&tags=' + tags));*/
  }

  render () {
    return (
      <div className="workerBody">
        this right here is our worker body
        <form className="addLinkForm">
          <input id="category" placeholder="hyper category" />
          <input id="tags" placeholder="hyper tags"/>
          <button onClick={this.sendLink} className="addTo">add to hyperspace</button>
        </form>
      </div>
    );
  }
}

export default HyperspaceWorker;