import React, { useState } from 'react';
import styles from './Main.module.css';
import { Link } from 'react-router-dom';

const FIELDS = {
  NAME: 'name',
  ROOM: 'room',
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [fieldValue, setFieldValue] = useState({ [NAME]: '', [ROOM]: '' });

  function handleChange({ target: { value, name } }) {
    setFieldValue({ ...fieldValue, [name]: value });
  }

  function handleClick(event) {
    const isDisabled = Object.values(fieldValue).some((value) => !value);
    if (isDisabled) event.preventDefault();
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>
        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              name="name"
              value={fieldValue[NAME]}
              className={styles.input}
              placeholder="Username"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="room"
              value={fieldValue[ROOM]}
              className={styles.input}
              placeholder="Room"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <Link
            to={`/chat?name=${fieldValue[NAME]}&room=${fieldValue[ROOM]}`}
            className={styles.group}>
            <button type="submit" className={styles.button} onClick={handleClick}>
              Sign in
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
