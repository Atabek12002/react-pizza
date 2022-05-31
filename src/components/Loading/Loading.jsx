import React from 'react';

import './loading.scss';

const Loading = () => {
  return (
    <div className="loading d-flex justify-center align-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
