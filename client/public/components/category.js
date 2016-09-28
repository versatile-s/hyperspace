import React, {Component} from 'react';
import Side from './side';

class Category extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      categoryTitle: '',
      data: []
    };
    this.categoryCall = this.categoryCall.bind(this);
  }

  componentWillMount () {
    this.categoryCall();
  }

  categoryCall () {
    this.setState({
      username: this.props.params.user,
      categoryTitle: this.props.params.category
    });
    fetch('/category', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        categoryTitle: this.state.categoryTitle
      })
    }).then((response) => {
      this.setState({
        data: response
      });
    })
    .catch((error) => {
      console.log(err);
    });
  }

  render () {
    return (
      <div>
        <h3>YOUR USERNAME IS: {this.state.username}</h3>
        <h3>YOUR CATEGORY IS: {this.state.categoryTitle}</h3>
        <h3>YOUR CATEGORY IS: {this.state.data}</h3>

        <h1>{this.state.categoryTitle}</h1>
        <h2>by: {this.state.username}</h2>
          {this.state.data.map((item) => {
            return (
              <div className="hyper">
                <h2 className="hyperTitle">{item.title}</h2>
                <a className="hyperUrl" href={item.url}><h3>Link here</h3></a>
                <h4 className="hyperDescription">{item.description}</h4>
                <img className="hyperImage" src={item.imgUrl}/>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Category;