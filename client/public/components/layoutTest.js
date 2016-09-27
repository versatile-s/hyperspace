import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

var knightPosition=[1,2];
export default class Table extends Component {
  render () {
    return (
      <Board knightPosition={knightPosition}/>
    );
  }
}

class Board extends Component {
  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    const black = (x + y) % 2 === 1;
    const [knightX, knightY] = this.props.knightPosition;
    const piece = (x === knightX && y === knightY) ? <Knight /> : null;

    return (
      <div key={i}
        style={{width: '12.5%', height: '12.5%'}}
        onClick={() => this.handleSquareClick(x, y)}>
        <Square black={black}>
          {piece}
        </Square>
      </div>
    );
  } 
  handleSquareClick(toX, toY) {
    console.log(toX,toY);
    knightPosition =[toX,toY];
    
  } 
  render () {
    const squares = [];
    for (let i = 0; i < 64; i ++) {
      squares.push(this.renderSquare(i));
      console.log("pushing");
    }
    console.log(squares);
    return (
      <div style={{
        width: 500,
        height: 500,
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div> 
    );
  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};



class Square extends Component {
  render () {
    const black = this.props.black;
    console.log("square props",this.props.black);
    console.log(black);
    const fill = black ? 'black' : 'white';
    console.log(fill);
    const stroke = black ? 'white' : 'black';

    return (
      <div style = {{
        backgroundColor: fill,
        color: stroke,
        width:'100%',
        height:'100%'
      }}>
        {this.props.children}
      </div>
    );  

  }
}

Square.propTypes = {
  black: PropTypes.bool
};

// const knightSource = {
//   beginDrag(props) {
//     return {};
//   }
// };

// var collect= function(connect, monitor) {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   };
// };
class Knight extends Component {
  render() {

    return( 
      <span >♘</span>
    );
  }
}
// Knight.propTypes = {
//   connectDragSource: PropTypes.func.isRequired,
//   isDragging: PropTypes.bool.isRequired
// };
// DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);