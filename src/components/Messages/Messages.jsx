import React from 'react';

import styles from './Messages.module.css';

function Messages({ messages, name }) {
  return (
    <div className={styles.messages}>
      {messages.map(({ message, user }, i) => {
        const isValidUser = user?.name.trim().toLowerCase() === name?.trim().toLowerCase();
        const className = isValidUser ? styles.me : styles.user;

        return (
          <div className={`${styles.message} ${className}`} key={i}>
            <span className={styles.name}>{user.name}</span>
            <div className={styles.text}>{message}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
