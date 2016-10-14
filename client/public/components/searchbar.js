import React, {Component} from 'react';
import Side from './side';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import store from '../../store';

class SearchBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchInput: ""
    };
    this.toSearch = this.toSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);

  }

  toSearch() {
    console.log("hi");
  }

  handleSearchChange() {
    this.setState({
      searchInput: this.refs.searchInput.getValue()
    });
  }

  render () {
    return (
      <div className="searchbar" style={store.getState().categoryInfo.categoryInfo.searchBar?{}:{display:"none"}}>
         <TextField hintText={"SEARCH GOOGLE"} style={{background: "#FFFFFF", width:'75%'}} ref="searchInput" onChange={this.handleSearchChange}/>
         <a href={"https://www.google.com/#safe=off&q="+this.state.searchInput} target="_blank"><RaisedButton style={{width:"10%"}} label="GO" onClick={this.toSearch}/></a>
      </div>
    );
  }
}


export default SearchBar;