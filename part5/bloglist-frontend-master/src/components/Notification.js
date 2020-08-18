import React from 'react';
import './Notification.css';

const Notification = ({ notification }) => {
  const { message, is_error } = notification;
  if (message === null) {
    return null;
  }
  const style = is_error ? 'error-notification' : 'notification';
  return <div className={style}>{message}</div>;
};

export default Notification;
