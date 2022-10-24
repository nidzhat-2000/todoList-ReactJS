import React, { useEffect } from 'react';

const Alert = ({ type, message, removeAlert, list }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
      // console.log('first alert removed');
    }, 3000);

    // console.log('second alert removed');
    return () => {
      clearTimeout(timeOut);
      // console.log('third alert removed');
    };
  }, [list]);

  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
