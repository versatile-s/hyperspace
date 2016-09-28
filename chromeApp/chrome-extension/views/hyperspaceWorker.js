import React, {Component} from 'react';

class HyperspaceWorker extends Component {
  constructor (props) {
    super(props);

    this.state = {
      url: tab.url,
      title: tab.title,
      category: '',
      tags: ''
    };
  }

  sendLink () {
    let url = tab.url;
    let title = tab.title;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:3000/link', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(encodeURI('url=' + url + '&title=' + title + '&category=' + category + '&tags=' + tags));
  }

  render () {
    return (
      <div className="workerBody">
        this right here is our worker body
        <form className="addLinkForm">
          <input id="category"/>
          <input id="tags"/>
          <button onCLick={this.props.authenticateUser} className="addTo">add to hyperspace</button>
        </form>
      </div>
    );
  }
}

export default HyperspaceWorker;