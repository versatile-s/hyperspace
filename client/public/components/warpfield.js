import React, {Component} from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import store from '../../store';

class Warpfield extends Component {
  constructor (props) {
    super(props);
    this.state = {
      warp:false
    };
    this.warpfield = this.warpfield.bind(this);
    this.accelerate = this.accelerate.bind(this);
  }

  warpfield() {
    if (this.state.warp) {
      new WarpSpeed("warpfield",{'speed':5, 'density':8});
    } else {
      new WarpSpeed("warpfield",{'speed':.2, 'density':8});
    }   
  }

  accelerate() {
    var context= this;
    if (this.state.warp) {
      this.setState({
        warp: false
      },function(){ 
        context.warpfield();
      });
    } else {
      this.setState({
        warp: true
      }, function(){ 
        context.warpfield();
      });
    }
  }

  componentDidMount(){
    this.warpfield();
  }

  render() {
    return (
      <div>
        <div onClick={this.accelerate}>
          {this.props.children}
        </div>
        <canvas id="warpfield">
        </canvas>
      </div>
    );
  }
}

export default Warpfield;