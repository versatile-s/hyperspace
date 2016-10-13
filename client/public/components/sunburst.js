import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import store from '../../store';
import {scaleLinear} from 'd3-scale';
import {arc} from 'd3-shape';
import rmc from 'random-material-color';
import * as utils from './utils'; 

const sum = function (node) {
  if (node.children && node.children.length) {
    let d = 0;
    let i = -1;
    let n = node.children.length;
    
    while (++i < n) {
      d += sum(node.children[i]);
    }
    return d;
  }
  return node.size;
};

const flatten = function (data, level, path) {
  var flat = [];
  var level = level || 1;
  var path = path || '';

  flat.push({
    name: data.name,
    size: data.size,
    level,
    path
  });

  if ( data.children && data.children.length ) {
    let i = -1;
    let n = data.children.length;
    while (++i < n) {
      flat.push(...flatten(data.children[i], level + 1, path ? `${path}-${i}` : `${i}`));
    }
  }

  return flat;
};


const depth = function (node) {
  let d = 0;

  if (node.children && node.children.length) {
    let i = -1;
    let n = node.children.length;

    while (++i < n) {
      d = Math.max(d, depth(node.children[i]));
    }
  }
  return 1 + d;
};

const findSum = function (data, level) {
  data.size = sum(data);
  var level = level || 1;
  
  if ( data.children && data.children.length ) {
    let i = -1;
    let n = data.children.length;

    while (++i < n) {
      data.children[i] = findSum(data.children[i]);
    }
    data.children.sort((a, b) => b.size - a.size); 
  }
  return data;
};


const hexArray = ['#2A0D45','#251434','#19042D','#733FA2','#7F5AA2','#4B093B','#39132F','#310326','#A5398A','#A55691','#181147','#1B1735','#0B062E','#5246A3','#675FA3'];

const randomizeHex = function () {
  var randomIndex = Math.floor(Math.random() * hexArray.length);
  console.log('RANDOM HEX IS', randomIndex);
  console.log('RETURNING VALUE', hexArray[randomIndex]);
  return hexArray[randomIndex];
};


class Sunburst extends Component {
  constructor (props) {
    super (props);

    this.state = {
      data: {}
    };

    let toDegrees = function (rad) {
      let deg = rad * 180 / Math.PI;
      return deg > 359 ? deg % 360 : deg;
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

  }

  componentWillMount () {
    var context = this;
    fetch('/getSunburst?username=' + store.getState().username.username)
      .then(function (response) {
        response.json().then(function(parsedRes) {
          return parsedRes;
        }).then(function (parsed) {
          context.setState({
            data: parsed
          });
        }).then(function () {
          context.forceUpdate();
        });
      }); 
  }

  handleMouseOver(e) {
    let path = e.target.getAttribute('data-path');
    let name = e.target.getAttribute('data-name');
    let size = e.target.getAttribute('data-value');
    let total = this.svg.getAttribute('data-total');
    let slices = this.svg.querySelectorAll(`path.slice:not([data-path^='${path}'])`);

    let i = -1;
    let n = slices.length;

    while (++i < n) {
      slices[i].style.opacity = '0.3';
    }

    this.details.textContent = name;
    this.percentage.textContent = `${(size * 100 / total).toFixed(2)}%`;
  }

  handleMouseOut(e) {
    var context = this;
    let slices = this.svg.querySelectorAll('path.slice');

    let i = -1;
    let n = slices.length;

    while (++i < n) {
      slices[i].style.opacity = '1';
    }

    this.details.textContent = '';
    this.percentage.textContent = '';
  }

  render () {
    var context = this;
    let width = 600;
    let height = 600;
    let radius = 400;
    let donutRadius = 100;
    let transform = `translate(${width * .5},${.5 * height})`;
    let slices = utils.flatten(utils.findSum(context.state.data));
    let scale = scaleLinear().domain([0, slices[0].size]).range([0, 2 * Math.PI]);
    let shape = arc();
    let depth = utils.depth(context.state.data);
    let currentStartAngle = 0;
    let currentLevel = 1;
    let arcWidth = (radius - donutRadius)/depth;
    let levelStartAngle = [0];

    return (
      <div className="sunburst-container col-md-3">
        <svg ref={(c) => this.svg = c} viewBox={`0 0 ${width} ${height}`} data-total={slices[0].size}>
        <g transform={transform}>
        {slices.map((slice, i) => {
          let { level, size, name} = slice;
          let startAngle = currentStartAngle;
          let endAngle = startAngle + scale(slice.size);
          let innerRadius = (slice.level - 1) * arcWidth;
          let outerRadius = innerRadius + arcWidth;

          if (slices[i + 1] && (slices[i + 1].level <= level)) {
            currentStartAngle = endAngle;
          }
          
          currentLevel = slice.level;

          return (    
          <path className='slice' data-path={slice.path}
            data-value={slice.size}
            stroke={'white'}
            strokeWidth={8}
            data-name={slice.name}
            display={i === 0 ? 'none' : 'inline'}
            fill={randomizeHex()}
            d={shape({
              startAngle,
              endAngle,
              innerRadius,
              outerRadius
            })} onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}>
            <title>{`${slice.name}\n${slice.size}`}</title>
            </path>
          );
        })}
        </g>
          <text transform={transform} ref={(c) => this.details = c}
            textAnchor='middle' className='details' dy={-20}/>
          <text transform={transform} ref={(c) => this.percentage = c}
            textAnchor='middle' className='details-percentage' dy={30}/>
        </svg>
      </div>
    );
  }

}

export default Sunburst;