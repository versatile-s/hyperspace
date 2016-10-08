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

class Bored extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playing: false
    };
    
    this.categoryCall = this.categoryCall.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.updateViews = this.updateViews.bind(this);
    this.sortData = this.sortData.bind(this);
    this.play=this.play.bind(this);
  }

  componentWillMount () {
    this.categoryCall();
  }
  componentDidMount(){
    this.play();
  }

  setCategory(category){
    var context=this;
    console.log("category param",category);
    store.dispatcher({type: 'CAT_TITLE', payload: category});
    console.log("state",this.state.categoryTitle);
    context.categoryCall();
  }

  updateViews (item) {
    var context = this;
    item.views +=1;
    fetch('/link', {
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.getState().username.username,
        title: item.title,  
        views: item.views

      })
      
    }).then(function(){
      context.sortData();
    });
  }

  sortData () {
    var tempData = store.getState().data.data.sort(function (a, b) {
      return b.views - a.views;
    });
    store.dispatch({type: 'GET_DATA', payload: tempData});
  }

 
  categoryCall () {
    var context = this;
    fetch('/categoryData', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.getState().username.username,
        categoryTitle: store.getState().categoryTitle.categoryTitle
      })
    }).then((response) => {
      response.json().then(function (data) {
        if (Array.isArray(data)) {
          console.log("data from category call",data);
          store.dispatch({type: 'GET_DATA', payload: data});
          context.sortData();
        } else {
          store.dispatch({type: 'GET_DATA', payload: [{title: "This category doesnt seem to have any links yet!"}]});
        }  
      });
    });
  }
  play(){
    var context= this;
    if(!context.state.playing){
      console.log("gameon");
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
    var render = Render.create({
      element: document.getElementById("sandbox"),
      engine: engine,
      options: {  
        width: window.innerWidth,
        height: 400,
      }

      // },
      // bounds: {
      //   min:{ x:0, y:0},
      //   max:{x:400, y:400}
      // }
    });
    // var boxArray=[];
    // for(var i = 0; i < 10; i ++){
    //   var box = Bodies.rectangle(300,300,40,40);
    //   boxArray.push(box);
    // }
    // create two boxes and a ground
    var fart= 3;
    // Matter.Composites.stack(xx, yy, columns, rows, columnGap, rowGap, callback)
    var stack = Composites.stack(10, 10, 7, 1, 20, 20, function(x, y) {
      var box1 =Bodies.rectangle(x, y, 100, 100, {restitution: 1});
      console.log("box1", box1);
      box1.render.fillStyle = "#FFFFFF";
      box1.render.strokeStyle= "#FFFFFF";
      return box1;
        
      
    });
    console.log(stack);



    
    
    var ceil = Bodies.rectangle(window.innerWidth/2, -45, window.innerWidth, 100,  { isStatic: true, render:{visible:false }});
    var floor = Bodies.rectangle(window.innerWidth/2, 445, window.innerWidth, 100, { isStatic: true, render:{visible:false }});
    var wallL = Bodies.rectangle(-45, 200, 100, 400, { isStatic: true, render:{visible:false }});
    var wallR = Bodies.rectangle(window.innerWidth+45, 200, 100, 400,  { isStatic: true, render:{visible:false }});

   
    // boxB.render.sprite.texture="/../../../assets/eye.jpg";

    engine.world.gravity.y=0;


    var mouseConstraint = Matter.MouseConstraint.create(render.engine,{
      element: render.canvas,
      constraint: {
        render: {
          visible: false
        }
      }  
  
    });
    
    var itemsToAdd= [ wallL, wallR, floor, ceil,stack, mouseConstraint];
    // itemsToAdd=itemsToAdd.concat(boxArray);
    // render.mouse = mouseConstraint.mouse;
    // add all of the bodies to the world
    World.add(engine.world, itemsToAdd);

    // World.bounds = { min: { x: 0, y: 0}, max: { x: 400, y: 400 } };
    // Events.on(mouseConstraint, "mousedown", function(){
    //   console.log('hi');

    // });
    console.log("engine", engine);

    // engine.world.bounds.min.x=0;
    // engine.world.bounds.min.y=0;
    // engine.world.bounds.max.x=400;
    // engine.world.bounds.max.y=300; 
    // Matter.Bounds.create(0,0,400,400);
    console.log(engine);

    // run the engine
    Engine.run(engine);


    // run the renderer
    console.log("render",render);
    render.options.wireframes = false;
    render.options.background = "#00FFFFFF";
    // render.options.style.
    render.options.hasBounds=true;
    render.canvas.style.backgroundSize = "stretch";

    Render.run(render);
    

  }

  render () {
    { var context = this; }
    return (
      <div>
       
         
 
        <div id="sandbox" className="categoryPageContainer">
       
        </div>    
      </div>
    );
  }
}


export default Bored;