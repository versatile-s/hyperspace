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



    var xStart=15;

    // header/footer
    var navbar = 50;
    var headerText = store.getState().categoryInfo.categoryInfo.fontSize;
    var footer = 50;

    var frame= headerText;

    //empty array to push shapes into
    var boxArray = [];

    var wHeight = window.innerHeight;
    var wWidth = window.innerWidth;

    //search bar box
    var ysearchDrop=0;
    if(store.getState().categoryInfo.categoryInfo.searchBar) {
      var ysearch=48;
      var xsearch=wWidth-(2*30);
      var ysearchmargins = 5;
      var y = ysearch / 2+5;
      ysearchDrop = ysearch + (2 * ysearchmargins);
      var search = Bodies.rectangle(wWidth / 2, y, xsearch, ysearch,{restitution: 1} );
      search.render.fillStyle = '#FFFFFF';
      search.render.strokeStyle = '#FFFFFF';
      boxArray.push(search);
    }


    var sunburstYdrop = 0;
    //sunburst circle
    if (store.getState().categoryInfo.categoryInfo.sunburst) {
      var sunburstmargins = 30;
      var xsunburst = wWidth / 4 - sunburstmargins * 2;
      var ysunburst = xsunburst;
      var sunburstRad = xsunburst / 2;
      var x = (wWidth-(xStart*2)) - ((wWidth-xStart*2) / 8) ;
      var y = ysearchDrop +sunburstRad + sunburstmargins;
      sunburstYdrop = ysunburst + 2 * sunburstmargins;
     
      var sunburst = Bodies.circle(x, y, sunburstRad, {restitution: 1});
      sunburst.render.fillStyle = '#FFFFFF';
      sunburst.render.strokeStyle = '#FFFFFF';
      boxArray.push(sunburst);
      
    }


    //friends feed
    var yfeedDrop = 0;
    if (store.getState().categoryInfo.categoryInfo.feed) {

      var xfriendbox = (wWidth - (2 * xStart)) * .75;
      var yfriendbox = 333;
      var yfriend = 114;
      var friendboxLeftMargin = 65;
      var friendboxTopMargin = 40;
      var friendMarginL = 15;
      var friendMarginT = 30;
      var xfriend = (xfriendbox - (8 * friendMarginL) - friendboxLeftMargin) / 4;
      yfeedDrop = yfriendbox;
      for (var p = 0; p < 4; p++) { 
        var x = friendboxLeftMargin + (xfriend / 2) + ( p * ((friendMarginL * 2)+xfriend));
        var y = ysearchDrop + (yfriend / 2) + friendboxTopMargin + friendMarginT;

        var boxTop = Bodies.rectangle(x, y, xfriend, yfriend, {restitution: 1});
        boxTop.render.fillStyle = '#FFFFFF';
        boxTop.render.strokeStyle = '#FFFFFF';
        console.log("boxtop", x, y, boxTop);
        boxArray.push(boxTop);
        var boxBottom = Bodies.rectangle(x, y+yfriend+friendMarginT, xfriend, yfriend, {restitution: 1});
        boxBottom.render.fillStyle = '#FFFFFF';
        boxBottom.render.strokeStyle = '#FFFFFF';
        console.log("boxBottom", boxBottom);
        boxArray.push(boxBottom);

      }

    }





    // var yStart = navbar + headerText + ystarburst + yfeed; 
    var drop = Math.max(sunburstYdrop, yfeedDrop);
    var yStart = 25 + drop +ysearchDrop;
    
    var boxMargin = 15;
    var boxWidth = ((wWidth - (xStart * 2) - (boxMargin * 2 * 3)) / 4)- 4;
    var boxHeight = 173;
    
    //number of hypers
    var boxnum = store.getState().data.data.length;


    var boxesX = Math.floor(wWidth / (boxWidth + boxMargin));
    var boxesY = Math.floor(boxnum / boxesX);
    var leftovers = boxnum - (boxesX * boxesY);


    var leftoverBoolean = leftovers ? 1 : 0;
    var totalHeight = yStart + ((boxesY + leftoverBoolean) * (boxHeight + (2 * boxMargin))) - (2 * boxMargin) + 5;
    totalHeight=Math.max(wHeight-frame,totalHeight);
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
        height: totalHeight
      }
    });

    //hypers

    for (var i = 0; i < boxesY; i ++) {
      for ( var j = 0; j < boxesX; j ++) {
        var x = xStart + (j * boxWidth) + (j * 2 * boxMargin) + ( boxWidth / 2);
        var y = yStart + (i * boxHeight) + (i * 2 * boxMargin) + (boxHeight / 2);
        var box = Bodies.rectangle(x, y, boxWidth, boxHeight, {restitution: 1});
        box.render.fillStyle = '#FFFFFF';
        box.render.strokeStyle = '#FFFFFF';
        console.log("box at:", x,y);
        boxArray.push(box);
      }
    }

    //adds trailing leftovers from grid
    for (var k = 0; k < leftovers; k++) {
      var x = xStart + (k * boxWidth) + (k * 2 *boxMargin) + (boxWidth / 2);
      var y = yStart + (boxesY * ((boxMargin*2) + boxHeight)) + (boxHeight / 2);
      var box = Bodies.rectangle(x, y, boxWidth, boxHeight, {restitution: 1});
      box.render.fillStyle = '#FFFFFF';
      box.render.strokeStyle = '#FFFFFF';
      boxArray.push(box);
    }

    var defaultCategory = -0x0001;
    //walls and floor    
    var ceil = Bodies.rectangle(window.innerWidth/2, -45, window.innerWidth, 100,  { isStatic: true, collisionFilter:{group:defaultCategory}, render:{visible:false }});
    var floor = Bodies.rectangle(window.innerWidth/2, totalHeight+45, window.innerWidth, 100, { isStatic: true, collisionFilter:{group:defaultCategory}, render:{visible:false }});
    var wallL = Bodies.rectangle(-45, 200, 100, totalHeight, { isStatic: true, collisionFilter:{group:defaultCategory}, render:{visible:false }});
    var wallR = Bodies.rectangle(window.innerWidth+45, 200, 100, totalHeight,  { isStatic: true, collisionFilter:{group:defaultCategory} , render:{visible:false }});

  
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
    console.log("boxArray",boxArray);
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
      var ball = context.state.Bodies.circle( context.state.wWidth*rand1 ,-100*rand2,10*rand1+5,{
        restitution: 1,
        mass:.5,
        collisionFilter: {
          group: context.state.defaultCategory
        }
        
      });
      ball.render.fillStyle="#FFFFFF";
      ball.render.strokeStyle="#FFFFFF";
      console.log("ball inc");
      context.state.World.add(context.state.engine.world, ball);
      Matter.Body.applyForce(ball,{x:context.state.wWidth*rand1,y:-200*rand2},{x:0,y:.5*rand2});
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
    { var hint = 'Search ' + this.props.params.user + '\'s ' + this.props.params.category + ' stash'; }
    {var color1 = store.getState().categoryInfo.categoryInfo.headerTextBackgroundColor;
      var color2 = store.getState().categoryInfo.categoryInfo.headerTextColor;
      var font = store.getState().categoryInfo.categoryInfo.fontFamily;
      var fontSize = store.getState().categoryInfo.categoryInfo.fontSize;
      var textAlign = store.getState().categoryInfo.categoryInfo.textAlign;
    }
    return (
      <div> 
        <div className="lowerHead" style={{background:color1, textAlign:textAlign}}>
          <span style={{fontFamily: font, color: color2, fontSize:fontSize}}>{store.getState().categoryInfo.categoryInfo.headerText || 'You are here: ' + this.props.params.category}</span>
          <TextField name="bored-content-filter" hintText={hint} className="filter-content-textbox filter-conten" ref="filterSearch" />
        </div>
        <div>
        <IconButton tooltip={"ASTEROIDS"} tooltipPosition={"bottom-right"} style={{zIndex:1000, position:"fixed", top:0, right: 400}} iconStyle={{color:"white"}} className="asteroidButton" onClick={this.enableAsteroids}><StarIcon style= {{color:"white"}}/></IconButton>
        </div> 
       
         
 
        <div id="sandbox" className="boredField">
       
        </div>    
      </div>
    );
  }
}


export default Bored;