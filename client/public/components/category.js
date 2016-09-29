import React, {Component} from 'react';
import Side from './side';

class Category extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.params.user,
      categoryTitle: this.props.params.category,
      data: []
    };
    
    this.categoryCall = this.categoryCall.bind(this);
  }

  componentWillMount () {
    this.categoryCall();
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
        username: this.state.username,
        categoryTitle: this.state.categoryTitle
      })
    }).then((response) => {
      response.json().then(function (data) {
        console.log(data);
        context.setState({
          data: data
        });
      });
    });
  }


  render () {
    return (
      <div>

        <h3>YOUR USERNAME IS: {this.state.username}</h3>
        <h3>YOUR CATEGORY IS: {this.state.categoryTitle}</h3>
          {this.state.data.map(function (item) {
            return (
              <div className="hyper">
                <h2 className="hyperTitle">{item.title}</h2>
                <a className="hyperUrl" href={"http://" + item.url}><h3>Link here</h3></a>
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