import React, {Component} from 'react';
import Side from './side';

class Category extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: 'Kira',
      categoryTitle: 'Javascript Study Material',
      hardcoded: [
        {
          title: 'Eloquent JS',
          url: 'http://eloquentjavascript.net/',
          description: 'An introduction to higher order functions!',
          imgUrl: 'https://codepo8.github.io/canvas-images-and-pixels/img/horse.png'
        },
        {
          title: 'React Router tutorial',
          url: 'https://www.youtube.com/watch?v=1iAG6h9ff5s',
          description: 'Thorough explanation on React Router',
          imgUrl: 'http://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg'
        },
        {
          title: 'The best SO question / Answer ever',
          url: 'http://stackoverflow.com/questions/2485423/is-using-var-to-declare-variables-optional',
          description: 'The answer to the question everyone has been wondering.',
          imgUrl: 'http://kaposiadays.org/wp-content/uploads/hot-dog-pic.png'
        }
      ]
    };
  }

  render () {
    return (
      <div>
        <h1>{this.state.categoryTitle}</h1>
        <h2>by: {this.state.username}</h2>
          {this.state.hardcoded.map((item) => {
            return (
              <div className="hyper" style={{display: 'flex', height: 200, width: 200}}>
                <h2>{item.title}</h2>
                <a href={item.url}><h3>Link here</h3></a>
                <h4>{item.description}</h4>
                <img style= {{top:0, right:0, width: 200}}src={item.imgUrl}/>
              </div>
            );
          })}
        <Side />
      </div>
    );
  }
}

export default Category;