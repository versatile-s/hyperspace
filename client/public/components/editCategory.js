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
import { SketchPicker } from 'react-color';
import DropDownMenu from 'material-ui/DropDownMenu';
import Checkbox from 'material-ui/Checkbox';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'


class EditCategory extends Component {
  constructor (props) {
    super(props);
    this.state = {
      warning: false,
      confirm: false,
      openMenu: false,
      displayColorPicker1: false,
      displayColorPicker2: false,
      color1: store.getState().categoryInfo.categoryInfo.headerTextBackgroundColor ||"#00FF00",
      color2: store.getState().categoryInfo.categoryInfo.headerTextColor||"#0000FF",
      fontSize: store.getState().categoryInfo.categoryInfo.fontSize,
      fontFamily: store.getState().categoryInfo.categoryInfo.fontFamily,
      textAlign: store.getState().categoryInfo.categoryInfo.textAlign,
      name: store.getState().categoryInfo.categoryInfo.name,
      headerText: store.getState().categoryInfo.categoryInfo.headerText,
      backgroundUrl: store.getState().categoryInfo.categoryInfo.backgroundUrl,

      searchBar: store.getState().categoryInfo.categoryInfo.searchBar,
      feed: false,
      sunburst: true,
      deleteMessage: ''
    };
    this.deleteCategory = this.deleteCategory.bind(this);
    this.warn = this.warn.bind(this);
    this.confirm = this.confirm.bind(this);
    this.handleWarnClose = this.handleWarnClose.bind(this);
    this.handleConfirmClose = this.handleConfirmClose.bind(this);
    this.updateChange = this.updateChange.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleClick1=this.handleClick1.bind(this);
    this.handleClick2=this.handleClick2.bind(this);
    this.handleClose1=this.handleClose1.bind(this);
    this.handleClose2=this.handleClose2.bind(this);
    this.handleChange1=this.handleChange1.bind(this);
    this.handleChange2=this.handleChange2.bind(this);
    this.closeMenu=this.closeMenu.bind(this);
    this.handleChangefontSize=this.handleChangefontSize.bind(this);
    this.handleChangefontFamily=this.handleChangefontFamily.bind(this);
    this.handleChangetextAlign=this.handleChangetextAlign.bind(this);
    this.handlesearchBar=this.handlesearchBar.bind(this);
    this.handlefeed=this.handlefeed.bind(this);
    this.handlesunburst=this.handlesunburst.bind(this);
    this.headerTextChange=this.headerTextChange.bind(this);
    this.backgroundChange=this.backgroundChange.bind(this);
    var context = this;
    store.subscribe(() => {

      context.forceUpdate();
      context.toggleOpen();

    });
  }

  componentWillMount(){
    if(this.props.params.user!==store.getState().username.username){
      store.dispatch({type: 'EDIT_SWITCH', payload: false});
    }
    this.toggleOpen();
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

  handleClick1() {
    this.setState({ displayColorPicker1: !this.state.displayColorPicker1 });
    this.forceUpdate();
  }

  handleClick2() {
    this.setState({ displayColorPicker2: !this.state.displayColorPicker2 });
    this.forceUpdate();
  }

  handleChange1(color) {
    this.setState({ color1: color.hex });
  }

  handleChange2(color) {
    this.setState({ color2: color.hex });
  }

  handleChangefontSize(event, index, val){
    this.setState({fontSize: val});
  }

  handleChangefontFamily(event, index, val){
    this.setState({fontFamily: val});
  }

  handleChangetextAlign(event, index, val){
    this.setState({textAlign: val});
  }

  handleClose1(){
    this.setState({ displayColorPicker1: false });
  }

  handleClose2(){
    this.setState({ displayColorPicker2: false });
  }

  handlesearchBar(){
    this.setState({ searchBar:!this.state.searchBar});
  }

  handlefeed(){
    this.setState({ feed:!this.state.feed});
  }

  handlesunburst(){
    this.setState({ sunburst:!this.state.sunburst});
  }


  headerTextChange(){
    this.setState({ headerText: this.refs.headerText.getValue()});
  }
  backgroundChange(){
    this.setState({ backgroundUrl: this.refs.backgroundUrl.getValue()});
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

        backgroundUrl: this.refs.backgroundUrl.getValue(),
        headerText: this.refs.headerText.getValue(),
        headerTextBackgroundColor: this.state.color1,
        headerTextColor: this.state.color2, 
        fontSize: this.state.fontSize,
        fontFamily: this.state.fontFamily,
        textAlign: this.state.textAlign,
        searchBar: this.state.searchBar,
        feed: this.state.feed,
        sunburst: this.state.sunburst
      })
    }).then(function(response){
      response.json().then(function(parsedRes){
        console.log(parsedRes);
        context.props.getCategory(store.getState().username.username, store.getState().categoryInfo.categoryInfo.name);
        context.forceUpdate();
        context.toggleOpen();
      });
    });
  }

  closeMenu(){
    this.setState({
      openMenu: false
    });
  }

  toggleOpen(){
    var context=this;
    if(this.state.openMenu){
      this.setState({
        openMenu: false
      }); 
    } else {
      this.setState({
        openMenu: true
      });
    }
    
    this.setState({
      color1: store.getState().categoryInfo.categoryInfo.headerTextBackgroundColor ||"#00FF00",
      color2: store.getState().categoryInfo.categoryInfo.headerTextColor||"#0000FF",
      fontSize: store.getState().categoryInfo.categoryInfo.fontSize,
      fontFamily: store.getState().categoryInfo.categoryInfo.fontFamily,
      textAlign: store.getState().categoryInfo.categoryInfo.textAlign,
      searchBar: store.getState().categoryInfo.categoryInfo.searchBar,
      feed: store.getState().categoryInfo.categoryInfo.feed,
      sunburst: store.getState().categoryInfo.categoryInfo.sunburst,
      name: store.getState().categoryInfo.categoryInfo.name,
      headerText: store.getState().categoryInfo.categoryInfo.headerText,
      backgroundUrl: store.getState().categoryInfo.categoryInfo.backgroundUrl
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
      <div className="editCategory" style={store.getState().edit.edit?{height:80}:{display:"none"}}>

      
        <Toolbar style={store.getState().edit.edit ? {zIndex: 100, width: '100%', height: '100%', justifyContent: 'center'} : {display:"none"}}>
          <div >
          <div style={{display:'flex', alignContent: 'space-between'}}>
          <ToolbarGroup firstChild={true}>
          <div style={{display: 'flex', flexDirection:'column'}}>
             <FlatButton label={"Header Text"} disabled={true}/>
           
            <TextField style={{width:'100%'}} ref="headerText" onChange={this.headerTextChange} value={this.state.headerText} defaultValue={store.getState().categoryInfo.categoryInfo.headerText} />
          </div>
          </ToolbarGroup>


          <ToolbarGroup>
          <div style={{display: 'flex', flexDirection:'column'}}>
             <FlatButton label={"Header Color"} disabled={true}/>
           
           
            
            <div style={{position: "relative", zIndex: 3, width:'100%',height:50,background: this.state.color1}} onClick={this.handleClick1}>
              <div onClick={this.handleClose1} style={this.state.displayColorPicker1?{position: 'absolute', top:-305}:{display:"none"}}>

              <SketchPicker color={ this.state.color1 } onChange={this.handleChange1} />
              </div>
            </div>
          </div> 
          </ToolbarGroup>
          <ToolbarGroup> 
          <div style={{display: 'flex', flexDirection:'column'}}>
             <FlatButton label={"Text Color"} disabled={true}/>
           
            
            
            
            <div style={{position: "relative", zIndex: 2, width:'100%',height:50,background: this.state.color2}} onClick={this.handleClick2}>
              <div onClick={this.handleClose2} style={this.state.displayColorPicker2?{position: 'absolute', top:-305}:{display:"none"}}>
              <SketchPicker color={ this.state.color2 } onChange={this.handleChange2} />
              </div>
            </div>

          </div>
          </ToolbarGroup>
          <ToolbarGroup >  
          <div style={{display: 'flex', flexDirection:'column'}}>
             <FlatButton label={"Background URL"} disabled={true}/>
           
           
           
            <TextField style={{width:'100%'}} ref="backgroundUrl" onChange={this.backgroundChange} value={this.state.backgroundUrl} defaultValue={store.getState().categoryInfo.categoryInfo.backgroundUrl}/>
          </div>
          </ToolbarGroup>
          <ToolbarGroup>
          <div style={{display: 'flex', flexDirection:'column'}}>
             <FlatButton label={"Font size"} disabled={true}/>
           
           
           
            

              <DropDownMenu value={this.state.fontSize} onChange={this.handleChangefontSize}>

                <MenuItem value={10} primaryText="10" />
                <MenuItem value={20} primaryText="20" />
                <MenuItem value={30} primaryText="30" />
                <MenuItem value={40} primaryText="40" />
                <MenuItem value={50} primaryText="50" />
                <MenuItem value={60} primaryText="60" />
                <MenuItem value={70} primaryText="70" />
                <MenuItem value={80} primaryText="80" />
                <MenuItem value={90} primaryText="90" />
                <MenuItem value={100} primaryText="100" />
              </DropDownMenu>
          </div>
          </ToolbarGroup>
          <ToolbarGroup>  
          <div style={{display: 'flex', flexDirection:'column'}}>
             <FlatButton label={"font"} disabled={true}/>
           
           
           
           
              <DropDownMenu style={{width: '100%'}} value={this.state.fontFamily} onChange={this.handleChangefontFamily}>

                <MenuItem value={"Trebuchet MS"} primaryText="Trebuchet MS" />
                <MenuItem value={"Tahoma"} primaryText="Tahoma" />
                <MenuItem value={"Arial"} primaryText="Arial" />
                <MenuItem value={"Gerogia"} primaryText="Gerogia" />
                <MenuItem value={"Times New Roman"} primaryText="Times New Roman" />
                <MenuItem value={"Lucida Sans Unicode"} primaryText="Lucida Sans Unicode" />
                <MenuItem value={"Impact"} primaryText="Impact" />
                <MenuItem value={"Veranda"} primaryText="Veranda" />
                <MenuItem value={"CBold"} primaryText="CBold" />
                <MenuItem value={"CBook"} primaryText="CBook" />
              </DropDownMenu>
          </div>
          </ToolbarGroup>
          <ToolbarGroup>
          <div style={{display: 'flex', flexDirection:'column'}}>
             <FlatButton label={"Text Align"} disabled={true}/>
           
           
           
          
              <DropDownMenu  style={{width: '100%'}} value={this.state.textAlign} onChange={this.handleChangetextAlign}>

                <MenuItem value={"left"} primaryText="Left" />
                <MenuItem value={"center"} primaryText="Center" />
               
              </DropDownMenu>
          </div>
          </ToolbarGroup>
 
            
          <ToolbarGroup>
          <div style={{display: 'flex', width:200, flexDirection:'column'}}>
            <Checkbox labelStyle={{color:'lightgray'}} label={"GOOGLE SEARCH"} checked={this.state.searchBar} onCheck={this.handlesearchBar}/>
            <Checkbox labelStyle={{color:'lightgray'}} label={"FRIEND FEED"} checked={this.state.feed} onCheck={this.handlefeed}/>
            <Checkbox labelStyle={{color:'lightgray'}} label={"SUNBURST CHART"}checked={this.state.sunburst} onCheck={this.handlesunburst}/>
          </div>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <div style={{display: 'flex', flexDirection:'column'}}>
              <IconButton tooltip={"Save Changes"} tooltipPosition={"top-right"} onClick={this.updateChange}><DoneIcon color={"black"}/></IconButton>
              <IconButton tooltip={"Delete Page"} tooltipPosition={"top-right"} style={store.getState().categoryInfo.categoryInfo.name ==="home"?{display:"none"}:{ position:'relative', top:-10}} onClick={this.warn}><DeleteIcon color={"black"}/></IconButton>
            </div>
          </ToolbarGroup>
          </div>
          </div>
        </Toolbar>
            <Dialog
              style={{position: "fixed",zIndex:4001}}
              title="ARE YOU SURE?"
              actions={warnActions}
              modal={false}
              open={this.state.warning}
              onRequestClose={this.handleWarnClose}
            >
              Are you sure you want to delete this Page?
            </Dialog>

            <Dialog
              style={{position: "fixed",zIndex:4001}}
              title="PAGE DELETED"
              actions={confirmActions}
              modal={false}
              open={this.state.confirm}
              onRequestClose={this.handleConfirmClose}
            >
              Deleted This Page: {this.state.deleteMessage}
            </Dialog>
          </div>
          

    );
  }
}
export default EditCategory; 
        // <IconMenu
        //   style={store.getState().edit.edit ? {zIndex: 100} : {display:"none"}}
        //   iconStyle={{opacity:.5, width:50}}
        //   // onTouchTap={this.getCategories}
        //   open={this.state.openMenu}
        //   disableAutoFocus={true}
        //   menuStyle={{width:250, zIndex:100}}
        //   touchTapCloseDelay={0}
        //   onRequestChange={this.closeMenu}
        //   onRequestClose={this.closeMenu}
        //   initiallyKeyboardFocused={false}
        //   iconButtonElement={<IconButton onClick={this.toggleOpen}><EditSettingsIcon /></IconButton>}
        //   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        //   targetOrigin={{horizontal: 'left', vertical: 'top'}}
        //   >