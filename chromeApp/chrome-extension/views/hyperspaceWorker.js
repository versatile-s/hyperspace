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
import FirstFiveCarousel from './firstFiveCarousel.js';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';


class HyperspaceWorker extends Component {
  constructor (props) {
    super(props);

    this.state = {
      authenticated: true,
      username: props.username,
      url: null,
      title: null,
      newCategory: '',
      category: '',
      tags: '',
      selections: [],
      description: '',
      highlighted: '',
      selectedImage: '',
      images: [],
      includeImage: false,
      fullyLoaded: false,
      tagStore: ['test', 'testing', 'test2'],
      snackbarOpen: false
    };

    this.sendLink = this.sendLink.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.takeCurrentGalleryImage = this.takeCurrentGalleryImage.bind(this);
    this.handleExcerptUpdate = this.handleExcerptUpdate.bind(this);
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

    this.getFirstFiveImages();
    this.handleHighlightedText();
  }

  componentDidMount() {
    this.setState({
      fullyLoaded: true
    });
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

  getFirstFiveImages () {
    var firstImageSRC = '';
    var context = this;

    var firstFive = [];

    chrome.tabs.executeScript({file: 'imageScraper.js'});

    chrome.runtime.onMessage.addListener(function (message) {
      if (message.method === 'gotImages') {
        message.images.forEach(function(current) {
          firstFive.push(current);
          console.log('first 5 images are', firstFive);
        });
        context.setState({
          images: firstFive
        });
        console.log('STATE IMAGES ARE ', context.state.images);
      }
    });
  }


  sendLink (e) {
    e.preventDefault();    
    
    let context = this;
  
    context.setState({
      snackbarOpen: true
    });
  
    this.handleHighlightedText();
    console.log('STATE IMAGES HERE WERE', this.state.images);

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
        let highlighted = context.state.highlighted;
        
        // handle category vs. new cateogry logic
        let category;
        context.state.category === 'or Add New Category' ? category = context.state.newCategory : category = context.state.category;
        

        let tags = context.state.tags;

        let firstImage = context.state.images[0];
        let image;
        
        // selected image handling        
        context.state.includeImage && context.state.selectedImage.length < 4 ? image = firstImage : image = context.state.selectedImage;

        console.log('TAGS TO BE SENT ARE', tags, '& HIGHLIGHTED TO BE SENT IS', highlighted);
        let request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:3000/link', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(encodeURI('url=' + url + '&title=' + title + '&category=' + category + '&tags=' + tags + '&username=' + username + '&description=' + highlighted + '&image=' + image));
        console.log('EVERYTHING SENT HERE IS', url, title, highlighted, image, category, tags);
      });
    };
    
    getCurrentTabUrl();
  }
  
  handleExcerptUpdate(e) {
    this.setState({
      description: e.target.value
    });
    console.log('HANDLING EXCERPT UPDATE AND', e.target.value);
    console.log('excerpt in state is', this.state.description);
  }

  handleInputChange(e) {
    this.setState({
      tags: e
    });
  }

  handleToggle() {
    this.setState({
      includeImage: !this.state.includeImage
    });
  }

  handleSelectChange(e) {
    this.setState({
      category: e.target.innerHTML
    });
  }

  takeCurrentGalleryImage(index) {
    console.log('TAKING GALLERY GOING', this.state.images[index]);
    this.setState({
      selectedImage: this.state.images[index]
    });
  }

  handleRequestClose() {
    this.setState({
      snackbarOpen: false
    });
  }

  render () {
    const context = this;
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
          {this.state.category === 'or Add New Category' ? <TextField floatingLabelText="New Category"
            value={this.state.newCategory} floatingLabelFixed={true} hintText="Enter New Category"/> :  <SelectField 
            floatingLabelText="Category" 
            value={this.state.category} 
            onChange={this.handleSelectChange} 
            selected={this.state.category}>
              {this.state.selections.map((item) => <MenuItem key={item} value={item} primaryText={item} /> )}
            <MenuItem value="or Add New Category" className="addNew" primaryText = "or Add New Category"/>
          </SelectField>}
          <ChipInput
             floatingLabelText="Tags"
             onRequestAdd={(chip) => handleAddChip(chip)}
             onRequestDelete={(chip) => handleDeleteChip(chip)}
             onChange={this.handleInputChange}
             dataSource={this.state.tagStore}
          />
          <TextField floatingLabelText="Excerpt"
            defaultValue={this.state.highlighted}
            onChange={this.handleExcerptUpdate}
            multiLine={true}
            rows={2}
            maxrows={6}
          />
          <div className="imageToggle">
            <Checkbox
               label="Include image?"
               onCheck={this.handleToggle}
             />
          </div>
          {this.state.includeImage ? this.state.images.length > 0 ? <FirstFiveCarousel images={this.state.images} takeCurrentGalleryImage={this.takeCurrentGalleryImage}/> : 'Sorry, no images were found on this page' : null}
          <FloatingActionButton onTouchTap={this.sendLink} className="addTo">
             <ContentAdd />
          </FloatingActionButton>
          <Snackbar
            open={this.state.snackbarOpen}
            className="sendLinkSnack"
            message="Sent to your hyperspace!"
            autoHideDuration={2500}
            onRequestClose={this.handleRequestClose}
          />
      </div> 
    );
  }
}

export default HyperspaceWorker;