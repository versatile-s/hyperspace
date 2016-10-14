import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Spinner = () => (
  <div className="spinner-container">
    <CircularProgress size={3} color={'#4A148C'}/>
  </div>
);

export default Spinner;