import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
 
class FirstFiveCarousel extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      counter: 0
    };
  }


  onSlide(index) {
    console.debug('slid to index', index);
    this.props.takeCurrentGalleryImage(index);
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
        onSlide={this.onSlide.bind(this)} />
    );
  }
}

export default FirstFiveCarousel;
