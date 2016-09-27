import React, {Component, PropTypes} from 'react';
import { DropTarget, DragDropContext } from 'react-dnd';
import SpaceKitty from './spacekitty';
import update from 'react/lib/update';
import ItemTypes from './ItemTypes';


const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox(item.id, left, top);
  }
};

const propTypes = {
  connectDropTarget: PropTypes.func.isRequired
};
const windowWidth= window.innerWidth;
const windowHeight= window.innerHeight;


class Home extends Component {

  constructor (props) {
    super(props);
    this.state = {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 20, left: 80, title: 'Drag me around' }
        
      }
    };
  }
  moveBox(id, left, top) {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      }
    }));
  }


  render() {
    const { connectDropTarget } = this.props;
    const { boxes} = this.state;
    return connectDropTarget(
      <div style={{height: windowHeight, width: windowWidth}}>
        <p>Your cool homepage</p>
        {Object.keys(boxes).map(key => {
          const { left, top, title } = boxes[key];
          return (
     
            <SpaceKitty key={key} id={key} left={left} top={top}/>
            );
        })
        }
        
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default DropTarget(ItemTypes.BOX, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Home);  