import React, {Component} from 'react';

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
          description: 'An introduction to higher order functions!'
        },
        {
          title: 'React Router tutorial',
          url: 'https://www.youtube.com/watch?v=1iAG6h9ff5s',
          description: 'Thorough explanation on React Router'
        },
        {
          title: 'The best SO question / Answer ever',
          url: 'http://stackoverflow.com/questions/2485423/is-using-var-to-declare-variables-optional',
          description: 'The answer to the question everyone has been wondering.'
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
              <div className="hyper">
                <h2>{item.title}</h2>
                <a href={item.url}><h3>Link here</h3></a>
                <h4>{item.description}</h4>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Category;