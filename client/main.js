import React from 'react';
import ReactDOM from 'react-dom';
import App from './public/app';

console.log('about to reactdom render');
ReactDOM.render(<App />, document.getElementById('content'));