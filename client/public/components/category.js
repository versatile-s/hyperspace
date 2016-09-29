import React, {Component} from 'react';
import Side from './side';

class Category extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: 'fart',
      categoryTitle: 'home',
      data: []
    };
    this.categoryCall = this.categoryCall.bind(this);
  }

  componentWillMount () {
    // this.setState({
    //   username: this.props.params.user,
    //   categoryTitle: this.props.params.category
    // });
    console.log(this.props.params);
    this.categoryCall();
  }

  categoryCall () {
    console.log(this.state);
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
      response.text().then(function (data) {
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
        <h3>YOUR DATA IS: {this.state.data}</h3>
      </div>
    );
  }
}

          // {this.state.data.map((item) => {
          //   return (
          //     <div className="hyper">
          //       <h2 className="hyperTitle">{item.title}</h2>
          //       <a className="hyperUrl" href={item.url}><h3>Link here</h3></a>
          //       <h4 className="hyperDescription">{item.description}</h4>
          //       <img className="hyperImage" src={item.imgUrl}/>
          //     </div>
          //   );
          // })}
export default Category;