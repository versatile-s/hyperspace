import React, {Component} from 'react';
import ChipInput from 'material-ui-chip-input';
import SelectField from 'material-ui/SelectField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';


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
      selections: [],
      highlighted: '',
      image: ''
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

    this.getFirstImage();
    this.handleHighlightedText();
  }

  handleHighlightedText() {
    var selectedText = '';
    var context = this;

    chrome.tabs.executeScript({
      code: 'window.getSelection().toString();' 
    }, function (selection) {
      selectedText = selection[0];
      context.setState({
        highlighted: selectedText
      });
    });

    if ( this.state.highlighted.length < 3 ) {
      chrome.tabs.executeScript({
        code: 'document.getElementsByTagName(\'p\')[0].textContent'
      }, function (selection) {
        selectedText = selection[0];
        context.setState({
          highlighted: selectedText
        });
      });
    }

    console.log(this.state.highlighted, 'HIGHLIGHTED HERE IS');
  }

  getFirstImage() {
    var firstImageSRC = '';
    var context = this;

    chrome.tabs.executeScript({
      code: 'document.getElementsByTagName(\'img\')[0].src'
    }, function (selection) {
      firstImageSRC = selection[0];
      console.log('IMAGE SRC IS ', firstImageSRC);
      context.setState({
        image: firstImageSRC
      });
    });
  }


  sendLink (e) {
    e.preventDefault();    
    this.handleHighlightedText();

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
        let highlighted = context.state.highlighted;
        let image = context.state.image;
        let category = context.state.tags;
        let tags = context.state.tags;
        console.log('TAGS TO BE SENT ARE', tags, '& HIGHLIGHTED TO BE SENT IS', highlighted);
        let request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:3000/link', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(encodeURI('url=' + url + '&title=' + title + '&category=' + category + '&tags=' + tags + '&username=' + username + '&description=' + highlighted + '&image=' + image));
      });
    };
    
    getCurrentTabUrl();
  }
  
  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      tags: e
    });
  }

  handleSelectChange(e) {
    this.setState({
      category: e.target.innerHTML
    });
  }


  render () {
    return (
      <div className="workerBody">
        <IconMenu className="miniMenu"
         iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
         anchorOrigin={{horizontal: 'left', vertical: 'top'}}
         targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
           <MenuItem className="logout" onClick={this.props.logOutUser} primaryText="Logout" />
         </IconMenu>
        <h5 className="welcome">welcome, {this.state.username}. <br/>add to your hyperspace.</h5>
          <SelectField 
            floatingLabelText="Category" 
            value={this.state.category} 
            onChange={this.handleSelectChange} 
            selected={this.state.category}>
              {this.state.selections.map((item) => <MenuItem key={item} value={item} primaryText={item} /> )}
              <TextField/>
          </SelectField>
          <ChipInput
             floatingLabelText="Tags"
             onRequestAdd={(chip) => handleAddChip(chip)}
             onRequestDelete={(chip) => handleDeleteChip(chip)}
             onChange={this.handleInputChange}
          />
          <TextField floatingLabelText="Excerpt"
            value={this.state.highlighted}
            multiLine={true}
            rows={2}
            maxrows={6}
          />
          <img className="imageSelection" src={this.state.image}/>
          <FloatingActionButton onClick={this.sendLink} className="addTo">
             <ContentAdd />
          </FloatingActionButton>
          <Snackbar
          open={this.sendLink}
          message="Sent to your hyperspace!"
          autoHideDuration={2500}
          className="invalidPass"
        />
      </div> 
    );
  }
}

export default HyperspaceWorker;