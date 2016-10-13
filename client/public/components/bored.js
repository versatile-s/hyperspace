import React, {Component} from 'react';
import Side from './side';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Matter from 'matter-js';
import store from '../../store';
import IconButton from 'material-ui/IconButton/IconButton';
import StarIcon from 'material-ui/svg-icons/toggle/star';

class Bored extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playing: false,
      asteroids: false,
      Bodies: null,
      World: null,
      engine: null,
      defaultCategory: null,
      wWidth: null,
      wHeight: null
    };
    
   
    this.play = this.play.bind(this);
    this.matterTest = this.matterTest.bind(this);
    this.enableAsteroids = this.enableAsteroids.bind(this);
    this.meteorshower = this.meteorshower.bind(this);
    this.toggleAsteroids = this.toggleAsteroids.bind(this);  
  }

  componentWillUnmount () {
    window.clearTimeout(window.showerName);
    
  }
  componentDidMount() {
    this.play();
  }

 
  play() {
    var context= this;
    if (!context.state.playing) {
      context.matterTest();
    }  
    this.setState({
      playing: true
    });
  }

  matterTest() {

    // module aliases
    var Engine = Matter.Engine;
    var Render = Matter.Render;
    var World = Matter.World;
    var Bodies = Matter.Bodies;
    var Composites = Matter.Composites;
    var Events = Matter.Events;
    var Constraint = Matter.Constraint;




    // create an engine
    var engine = Engine.create({
    
    });




    // create a renderer
    var navbar = 50;
    var headerText = 100;
    var footer = 50;


    var xwheel = 0;
    var ywheel = 0;
    var wheelmargins = 0;
    if (store.getState().categoryInfo.categoryInfo.wheel) {
      xwheel += 300;
      ywheel += 300;
      wheelmargins += 20;
    }


    var xfeed = 0;
    var yfeed = 0;
    if (store.getState().categoryInfo.categoryInfo.feed) {
      xfeed += 300;
      yfeed += 300;
    }

    var boxWidth = 200;
    var boxHeight = 200;
    var boxMargin = 10;

    var yStart = navbar + headerText + ywheel + yfeed; 
    var wHeight = window.innerHeight;
    var wWidth = window.innerWidth;
    
    //number of hypers
    var boxnum = store.getState().data.data.length;
    console.log('Boxnum', boxnum);    

    var boxesX = Math.floor(wWidth / (boxWidth + boxMargin));
    var boxesY = Math.floor(boxnum / boxesX);
    var leftovers = boxnum - (boxesX * boxesY);
    console.log('boxes x,y,leftovers', boxesX, boxesY, leftovers);

    //if we only have 1 row of boxes, use leftover loop instead
    if (boxesY === 0) {
      leftovers = boxnum;
    }
    var boundsLimit = navbar + headerText + footer;

    //renderer
    var render = Render.create({
      element: document.getElementById("sandbox"),
      engine: engine,
      options: {  
        width: window.innerWidth,
        height: window.innerHeight - boundsLimit
      }
    });

    //hypers
    var boxArray = [];

    for (var i = 0; i < boxesY; i ++) {
      for ( var j = 0; j < boxesX; j ++) {
        var x = (j * boxWidth) + (j * boxMargin) + (boxMargin + boxWidth / 2);
        var y = (i * boxHeight) + (i * boxMargin) + (boxMargin + boxHeight / 2);
        var box = Bodies.rectangle(x, y, boxWidth, boxHeight, {restitution: 1});
        box.render.fillStyle = '#FFFFFF';
        box.render.strokeStyle = '#FFFFFF';
        console.log("box at:", x,y);
        boxArray.push(box);
      }
    }

    //adds trailing leftovers from grid
    for (var k = 0; k < leftovers; k++) {
      var x = (k * boxWidth) + (k * boxMargin) + (boxMargin + boxWidth / 2);
      var y = (boxesY * (boxMargin + boxHeight)) + (boxMargin + boxWidth / 2);
      var box = Bodies.rectangle(x, y, boxWidth, boxHeight, {restitution: 1});
      box.render.fillStyle = '#FFFFFF';
      box.render.strokeStyle = '#FFFFFF';
      boxArray.push(box);
    }

    var defaultCategory = -0x0001;
    //walls and floor    
    var ceil = Bodies.rectangle(window.innerWidth/2, -45, window.innerWidth, 100,  { isStatic: true, collisionFilter:{group:defaultCategory}, render:{visible:false }});
    var floor = Bodies.rectangle(window.innerWidth/2, window.innerHeight-boundsLimit+45, window.innerWidth, 100, { isStatic: true, collisionFilter:{group:defaultCategory}, render:{visible:false }});
    var wallL = Bodies.rectangle(-45, 200, 100, window.innerHeight-boundsLimit, { isStatic: true, collisionFilter:{group:defaultCategory}, render:{visible:false }});
    var wallR = Bodies.rectangle(window.innerWidth+45, 200, 100, window.innerHeight-boundsLimit,  { isStatic: true, collisionFilter:{group:defaultCategory} , render:{visible:false }});

  
    //zero gravity
    engine.world.gravity.y = 0;

    //mouse drag and pull
    var mouseConstraint = Matter.MouseConstraint.create(render.engine,{
      element: render.canvas,
      constraint: {
        render: {
          visible: false
        }
      }  
    });
    

    //concat all items to add to world
    var itemsToAdd = [ wallL, wallR, floor, ceil, mouseConstraint];
    itemsToAdd = itemsToAdd.concat(boxArray);

    // add all of the bodies to the world
   
    World.add(engine.world, itemsToAdd);

    // run the engine
    Engine.run(engine);


    // run the renderer
    render.options.wireframes = false;
    render.options.background = '#00FFFFFF';

    render.options.hasBounds = true;
    render.canvas.style.backgroundSize = 'stretch';

    Render.run(render);
    this.setState({
      Bodies: Bodies,
      World: World,
      engine: engine,
      defaultCategory: defaultCategory,
      wWidth:wWidth,
      wHeight:wHeight
    });

    


  }

  

  enableAsteroids() {
    var context = this;
    this.setState({
      asteroids: !this.state.asteroids
    }, context.toggleAsteroids);

  }
  meteorshower() {
    var context = this;
    window.showerName = setInterval(function() {
      var rand1 = Math.random();
      var rand2 = Math.random();
      var ball = context.state.Bodies.circle( -200*rand1 ,-100*rand2,10*rand1+5,{
        restitution: 1,
        mass:.5,
        collisionFilter: {
          group: context.state.defaultCategory
        }
        
      });
      console.log("ball inc");
      context.state.World.add(context.state.engine.world, ball);
      Matter.Body.applyForce(ball,{x:context.state.wWidth*rand1,y:context.state.wHeight*rand2},{x:.5*rand1,y:.5*rand2});
    }, 1000);
    window.showerName();
  }
      
  toggleAsteroids(){

    if(this.state.asteroids){
      this.meteorshower();
    } else{
      window.clearTimeout(window.showerName);
    }
  }

  

  render () {
    { var context = this; }
    return (
      <div> 
        <div>
        <IconButton style={{zIndex:1000, position:"fixed", top:0, right: 400}} iconStyle={{color:"white"}} className="asteroidButton" onClick={this.enableAsteroids}><StarIcon style= {{color:"white"}}/></IconButton>
        </div> 
       
         
 
        <div id="sandbox" className="categoryPageContainer">
       
        </div>    
      </div>
    );
  }
}


export default Bored;