import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';

import icon from '../../images/icon.svg';

import styles from './Chat.module.css';
import Messages from '../Messages/Messages';

let socket = io.connect('http://localhost:5000');

const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [params, setParams] = useState({ room: '', user: '' });
  const [message, setMessage] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [usersRoom, setUserRoom] = useState(0);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on('room', ({ data: { users } }) => {
      setUserRoom(users?.length);
    });
  }, []);

  const leaveRoom = () => {
    socket.emit('leaveRoom', { params });

    navigate('/');
  };

  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit('sendMessage', { message, params });

    setMessage('');
  };

  function onEmojiClick({ emoji }) {
    setMessage(`${message} ${emoji}`);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}>{usersRoom} user in this room</div>
        <button className={styles.leave} onClick={leaveRoom}>
          leave the room
        </button>
      </div>
      <Messages messages={state} name={params.name} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            value={message}
            className={styles.input}
            placeholder="What do you want to say"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.emoji}>
          <img
            src={icon}
            alt=""
            onClick={() => {
              setOpen(!isOpen);
            }}
          />

          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} className={styles.emojies}></EmojiPicker>
            </div>
          )}
        </div>

        <div className={styles.button}>
          <input type="submit" onSubmit={handleSubmit} value="Send a message" />
        </div>
      </form>
    </div>
  );
};

export default Chat;
