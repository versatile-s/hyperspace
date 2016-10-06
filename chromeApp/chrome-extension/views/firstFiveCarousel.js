import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
 
class FirstFiveCarousel extends React.Component {

  constructor (props) {
    super(props);
    console.log(props, 'PROPS ARE');
  }

  handleImageLoad(event) {
    console.log('Image loaded ', event.target);
  }

  componentDidMount () {
  }
 
  render() {
    const images = 
      this.props.images.map(function (image) {
        return {original: image};
      });

    return (
      <ImageGallery
        ref={i => this._imageGallery = i}
        infinite={false}
        items={images}
        slideInterval={1000}
        lazyLoad={true}
        showThumbnails={false}
        showPlayButton={false}
        showIndex={true}
        showFullscreenButton={false}
        onSlide={this.props.takeCurrentGalleryImage}
        onImageLoad={this.handleImageLoad}/>
    );
  }
}

export default FirstFiveCarousel;
