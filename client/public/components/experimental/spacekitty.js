import React, {Component, PropTypes} from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

var spaceKittyStyle = {
  position: 'absolute',
  width: 200

};

var boxSource = {
  beginDrag(props) {
    console.log(props);
   
    const { id, left, top } = props;
    return { id, left, top };
  }
};

var collect = function(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};


const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
};


class SpaceKitty extends Component {
  constructor (props) {
    super(props);

  }




  render() {
    const {left, top, connectDragSource, isDragging } = this.props;
    

    return connectDragSource(

     
      
      <img src="/../assets/spacekitty.jpg" style = {{position: 'absolute', width: 100, top, left}} />

    );
  }
    
}

SpaceKitty.propTypes = propTypes;

export default DragSource(ItemTypes.BOX, boxSource, collect)(SpaceKitty);  