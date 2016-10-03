import React, {Component} from 'react';
import ChipInput from 'material-ui-chip-input';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';


class HyperspaceWorker extends Component {
  constructor (props) {
    super(props);

    this.state = {
      authenticated: true,
      username: props.username,
      url: null,
      title: null,
      category: '',
      tags: '',
      selections: []
    };
    this.sendLink = this.sendLink.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentWillMount () {
    injectTapEventPlugin();

    let context = this;
    // hit DB and pull categories for given user
    let request = new XMLHttpRequest();
    let url = 'http:127.0.0.1:3000/usercategories';
    let params = '?username=' + this.props.username;

    request.onreadystatechange = function () {
      // remove brackets, quotation marks and split on the comma to create new array
      var unfiltered = this.responseText.slice(1, -1).replace(/['"]+/g, '').split(',');
      
      context.setState({
        selections: unfiltered
      });
    };
    
    request.open('GET', url + params, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send();
  }

  sendLink (e) {
    e.preventDefault();    
    let username = this.state.username;
    let context = this;

    let getCurrentTabUrl = function () {
      let queryInfo = {
        active: true,
        currentWindow: true
      };

      chrome.tabs.query(queryInfo, function (tabs) {
        let tab = tabs[0];
        let url = tab.url;
        let title = tab.title;
        let category = 'cat';
        let tags = context.state.tags;
        console.log('TAGS TO BE SENT ARE', tags);
        let request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:3000/link', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(encodeURI('url=' + url + '&title=' + title + '&category=' + category + '&tags=' + tags + '&username=' + username));
      });
    };

    getCurrentTabUrl();
  }
  
  handleInputChange(e) {
    this.setState({
      tags: e
    });
  }

  handleSelectChange(e) {
    console.log(e.target.innerHTML, 'E HERE IS ');
    this.setState({
      category: e.target.innerHTML
    });
    console.log('STATE CAT IS', this.state.cateogry);
  }

  render () {
    console.log('STATE CATEGORY IS', this.state.category);

    return (
      <div className="workerBody">
        <h5 className="welcome">welcome, {this.state.username}</h5>
        <p className="workerPrompt">add to your hyperspace:</p>
        <h3 className="hyperUrl"></h3>
        <form className="addLinkForm">
          <SelectField value={this.state.category} onChange={this.handleSelectChange} selected={this.state.category}>
            {this.state.selections.map((item) => <MenuItem key={item} value={item} primaryText={item} /> )}
          </SelectField>
          <ChipInput
             onRequestAdd={(chip) => handleAddChip(chip)}
             onRequestDelete={(chip) => handleDeleteChip(chip)}
             onChange={this.handleInputChange}
          />
          <button onClick={this.sendLink} className="addTo">add to hyperspace</button>
        </form>
        
        <button className="logOut" onClick={this.props.logOutUser}>logout</button>
      </div>
    );
  }
}

export default HyperspaceWorker;