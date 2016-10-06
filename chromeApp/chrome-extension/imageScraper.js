console.log('scraping!');

var images = [];

for ( var i = 0; i < 5; i ++ ) {
  document.images[i].src.length > 2 ? images.push(document.images[i].src) : null;
}

chrome.runtime.sendMessage({method: 'gotImages', images: images});

console.log('scraped images are', images);