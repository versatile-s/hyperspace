import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import ListIcon from 'material-ui/svg-icons/action/list';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit';
import Matter from 'matter-js';

class Bored extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.username,
 
    };

  }
  physicsInit (engine) {
    const ground = Matter.Bodies.rectangle(
      512 * 3, 448,
      1024 * 3, 64,
      {
        isStatic: true,
      }
    );

    const leftWall = Matter.Bodies.rectangle(
      -64, 288,
      64, 576,
      {
        isStatic: true,
      }
    );

    const rightWall = Matter.Bodies.rectangle(
      3008, 288,
      64, 576,
      {
        isStatic: true,
      }
    );

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
  }


  matterTest() {

    // module aliases
    var Engine = Matter.Engine;
    var Render = Matter.Render;
    var World = Matter.World;
    var Bodies = Matter.Bodies;
    var Composites = Matter.Composites;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
      element: document.body,
      engine: engine
    });

    console.log(Bodies.rectangle(400, 200, 80, 80));
    // create two boxes and a ground
    var fart= 3;
    // Matter.Composites.stack(xx, yy, columns, rows, columnGap, rowGap, callback)
    var stack = Composites.stack(200, 200, 4, fart, 10, 10, function(x, y) {
      for(var i =0; i < 10; i ++){
        return Bodies.rectangle(x, y, 20, 20);
        
      }
    });

    for (var i = 0; i < 20; i ++){
      var abox = Bodies.rectangle(5,5,5,5);
      abox.frictionAir=1;
      World.add(engine.world, abox);

    }
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    boxB.render.sprite.texture="/../../../assets/eye.jpg";
    boxB.render.fillStyle= '#edc51e';
    console.log(boxB);

    // add all of the bodies to the world
    World.add(engine.world, [boxB, ground,stack]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    console.log(render.options);
    render.options.wireframes = false;
    render.options.background = "http://www.freedigitalphotos.net/images/img/homepage/87357.jpg";
    Render.run(render);
    

  }
  render () {
    return (
      <div onClick={this.matterTest}>
        <p>hi</p>
        <img src="./../assets/horse.png"/>
      </div>

    
    );
  }
}

export default Bored;
      // <Loop>
      //   <Stage style={{ background: '#3a9bdc' }}>
      //     <World onInit={this.physicsInit}>
      //       <Body
      //         args={[-100, 0, 0, 0]}
      //         ref={(b) => { this.body = b; }}
      //         >
      //         <Sprite  
      //           src="http://weknowyourdreams.com/images/ball/ball-05.jpg"
                  
      //                   />

      //       </Body>  
      //     </World>
      //   </Stage>
      // </Loop>