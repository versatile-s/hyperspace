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
import EditSettingsIcon from 'material-ui/svg-icons/editor/mode-edit';
import store from '../../store';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DoneIcon from 'material-ui/svg-icons/action/done';
import Dialog from 'material-ui/Dialog';

class EditHyper extends Component {
  constructor (props) {
    super(props);
    this.state = {
      warning: false,
      confirm: false,
      deleteMessage: ''
    };
    this.deleteHyper = this.deleteHyper.bind(this);
    this.warn = this.warn.bind(this);
    this.confirm = this.confirm.bind(this);
    this.handleWarnClose = this.handleWarnClose.bind(this);
    this.handleConfirmClose = this.handleConfirmClose.bind(this);
    this.updateChange = this.updateChange.bind(this);
    // var context = this;
    // store.subscribe(() => {
    //   context.forceUpdate();
    // });
  }

  componentWillMount(){
    if(this.props.params.user!==store.getState().username.username){
      store.dispatch({type: 'EDIT_SWITCH', payload: false});
    }
  }
  deleteHyper(){
    var context = this;
    fetch('/removeLink',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.getState().username.username,
        title: this.props.item.title,
      })

    }).then(function(response){
      response.json().then(function(parsedRes){
        context.setState({
          deleteMessage: parsedRes.title
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
    this.props.categoryCall();
    this.setState({
      confirm:false
    });
  }

  updateChange(){
    var context = this;
    fetch('/editLink',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.getState().username.username,
        oldTitle: this.props.item.title,
        newTitle: this.refs.title.getValue(),
        description: this.refs.description.getValue(),
        image: this.refs.image.getValue() 
      })

    }).then(function(response){
      response.text().then(function(parsedRes){
        console.log(parsedRes);
        context.props.categoryCall();
      });
    });


   
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
        onTouchTap={this.deleteHyper}
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
      <div className="editHyper">
        <IconMenu
          style={store.getState().edit.edit?{}:{display:"none"}}
          iconStyle={{opacity:.5, width:50}}
          // onTouchTap={this.getCategories}
          disableAutoFocus={true}
          menuStyle={{width:250}}
          touchTapCloseDelay={0}
          initiallyKeyboardFocused={false}
          iconButtonElement={<IconButton><EditSettingsIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
          <div>
            <FlatButton label="Title" disabled={true}/>
            <TextField name="item-title-textfield" ref="title" defaultValue={this.props.item.title}/>
            <FlatButton label={"Description"} disabled={true}/>
            <TextField name="item-description-textfield" ref="description" defaultValue={this.props.item.description}/>
            <FlatButton label={"Image URL"} disabled={true}/>
            <TextField name="item-image-textfield" ref="image" defaultValue={this.props.item.image}/>
            <IconButton tooltip={"Delete Hyperlink"} tooltipPosition={"top-right"} onClick={this.warn}><DeleteIcon/></IconButton>
            <IconButton tooltip={"Save Changes"} tooltipPosition={"top-right"} onClick={this.updateChange}><DoneIcon/></IconButton>
          </div>
          <div>
            <Dialog
              style={{position: "fixed",zIndex:4001}}
              title="ARE YOU SURE?"
              actions={warnActions}
              modal={false}
              open={this.state.warning}
              onRequestClose={this.handleWarnClose}
            >
              Are you sure you want to delete this Link?
            </Dialog>

            <Dialog
              style={{position: "fixed",zIndex:4001}}
              title="LINK DELETED"
              actions={confirmActions}
              modal={false}
              open={this.state.confirm}
              onRequestClose={this.handleConfirmClose}
            >
              Deleted This Link: {this.state.deleteMessage}
            </Dialog>
          </div>
          

        </IconMenu>

      </div>  
    );
  }
}
export default EditHyper; 