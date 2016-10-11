import React, {Component} from 'react';
import Router, { Link } from 'react-router';
import { browserHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import EditSettingsIcon from 'material-ui/svg-icons/action/perm-data-setting';
import store from '../../store';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DoneIcon from 'material-ui/svg-icons/action/done';
import Dialog from 'material-ui/Dialog';

class EditCategory extends Component {
  constructor (props) {
    super(props);
    this.state = {
      warning: false,
      confirm: false,
      openMenu: false,
      deleteMessage: ''
    };
    this.deleteCategory = this.deleteCategory.bind(this);
    this.warn = this.warn.bind(this);
    this.confirm = this.confirm.bind(this);
    this.handleWarnClose = this.handleWarnClose.bind(this);
    this.handleConfirmClose = this.handleConfirmClose.bind(this);
    this.updateChange = this.updateChange.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    var context = this;
    store.subscribe(() => {
      context.forceUpdate();
    });
  }

  componentWillMount(){
    if(this.props.params.user!==store.getState().username.username){
      store.dispatch({type: 'EDIT_SWITCH', payload: false});
    }
  }
  deleteCategory(){
    var context = this;
    fetch('/deleteCategory',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.getState().username.username,
        title: store.getState().categoryInfo.categoryInfo.name,
      })

    }).then(function(response){
      response.json().then(function(parsedRes){
        context.setState({
          deleteMessage: parsedRes.name
        }, function() {
          context.handleWarnClose();
          context.confirm();

        });
      });
    });
  }
   
  warn() {
    this.setState({
      warning: true
    });
  }

  handleWarnClose(){
    this.setState({
      warning:false
    });
  }

  confirm() {
    this.setState({
      confirm: true
    });
  }

  handleConfirmClose(){
    console.log("confirmClose this",this);
    // browserHistory.push()
    this.props.categoryCall(store.getState().username.username,"home");
    this.props.getCategory(store.getState().username.username, "home");
    this.setState({
      confirm:false,
      openMenu:false
    });
  }

  updateChange(){
    var context = this;
    fetch('/category',{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.getState().username.username,
        name: store.getState().categoryInfo.categoryInfo.name,
        newName: this.refs.newName.getValue(),
        backgroundUrl: this.refs.backgroundUrl.getValue(),
        headerText: this.refs.headerText.getValue(),
        headerTextBackgroundColor: this.refs.headerTextBackgroundColor.getValue(),
        headerTextColor: this.refs.headerTextColor.getValue() 
      })

    }).then(function(response){
      response.json().then(function(parsedRes){
        console.log(parsedRes);
        context.props.getCategory(store.getState().username.username, context.refs.newName.getValue());
        context.forceUpdate();
        context.toggleOpen();
      });
    });


   
  }

  toggleOpen(){
    if(this.state.openMenu){
      this.setState({
        openMenu: false
      }); 
    } else {
      this.setState({
        openMenu: true
      });
    }
  }


  render () {
    const warnActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleWarnClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.deleteCategory}
      />,
    ];
    const confirmActions = [
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.handleConfirmClose}
      />,
    ];

    return (
      <div className="editCategory">
        <IconMenu
          style={store.getState().edit.edit?{}:{display:"none"}}
          iconStyle={{opacity:.2, width:50}}
          // onTouchTap={this.getCategories}
          open={this.state.openMenu}
          disableAutoFocus={true}
          menuStyle={{width:250}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton onClick={this.toggleOpen}><EditSettingsIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
          <div>
          <div>
            <FlatButton label="Header Text" disabled={true}/>
            <TextField ref="headerText" defaultValue={store.getState().categoryInfo.categoryInfo.headerText}/>
            <FlatButton label="Page Name" disabled={true}/>
            <TextField ref="newName" defaultValue={store.getState().categoryInfo.categoryInfo.name}/>
            <FlatButton label={"Header Text Backgound Color"} disabled={true}/>
            <TextField ref="headerTextBackgroundColor" defaultValue={store.getState().categoryInfo.categoryInfo.headerTextBackgroundColor}/>
            <FlatButton label={"Header Text Color"} disabled={true}/>
            <TextField ref="headerTextColor" defaultValue={store.getState().categoryInfo.categoryInfo.headerTextColor}/>
            <FlatButton label={"Background URL"} disabled={true}/>
            <TextField ref="backgroundUrl" defaultValue={store.getState().categoryInfo.categoryInfo.backgroundUrl}/>
            <IconButton onClick={this.warn}><DeleteIcon/></IconButton>
            <IconButton onClick={this.updateChange}><DoneIcon/></IconButton>
          </div>
            <Dialog
              style={{position: "fixed",zIndex:4001}}
              title="ARE YOU SUUUUURE?"
              actions={warnActions}
              modal={false}
              open={this.state.warning}
              onRequestClose={this.handleWarnClose}
            >
              Are you sure you want to delete this Page?
            </Dialog>

            <Dialog
              style={{position: "fixed",zIndex:4001}}
              title="GONE BABY"
              actions={confirmActions}
              modal={false}
              open={this.state.confirm}
              onRequestClose={this.handleConfirmClose}
            >
              Deleted This Page: {this.state.deleteMessage}
            </Dialog>
          </div>
          

        </IconMenu>

      </div>  
    );
  }
}
export default EditCategory; 