import React, {Component} from 'react';
import ChipInput from 'material-ui-chip-input';

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
    console.log(1);
  }

  componentWillMount () {
    this.setState({
      username: this.props.username
    });

    let context = this;
    // hit DB and pull categories for given user
    let request = new XMLHttpRequest();
    let url = 'http:127.0.0.1:3000/usercategories';
    let params = '?username=' + this.props.username;
    
    
    let categoryContainer = [];
    
    request.onreadystatechange = function () {
      // remove brackets, quotation marks and split on the comma to create new array
      let newThing = this.responseText.slice(1, -1).replace(/['"]+/g, '').split(',');
      
      // check categories received, push to selections if not already there
      newThing.forEach(function(category) {
        categoryContainer.indexOf(category) === -1 ? categoryContainer.push(category) : null;
      });
    };

    this.setState({
      selections: categoryContainer
    });
    
    request.open('GET', url + params, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send();
    console.log('STATE SELECT IN WILL MOUNT IS', this.state.selections);
    console.log(2);
  }

  componentDidMount () {
    console.log('MOUNTED AND WE HAVE', this.state.selections);
    this.render();
    console.log(3);
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
    console.log(4);
    console.log(this.state.selections);
    var localArray = this.state.selections;
    console.log('local array here is ', this.state.selections);
    return (
      <div className="workerBody">
        <h5 className="welcome">welcome, {this.state.username}</h5>
        <p className="workerPrompt">add to your hyperspace:</p>
        <h3 className="hyperUrl"></h3>
        <form className="addLinkForm">
          <select> 
          {
            this.state.selections.map(function(category) {
              return <option> {category} </option>;
            })
          }
          </select>
          <input id="category" placeholder="hyper category" />
                 <ChipInput
                   id="tags"
                   onRequestAdd={(chip) => handleAddChip(chip)}
                   onRequestDelete={(chip) => handleDeleteChip(chip)}
                 />
          <button onClick={this.sendLink} className="addTo">add to hyperspace</button>
        </form>
        
        <button className="logOut" onClick={this.props.logOutUser}>logout</button>
      </div>
    );
  }
}

export default HyperspaceWorker;