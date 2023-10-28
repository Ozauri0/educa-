import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Notif.css';
import { IonInput } from '@ionic/react';
import SocketComponent from '../components/SocketComponent';
// import UserComponent from '../components/UserComponent';
import axios from 'axios';

const socket = io('http://localhost:5000');


const NotificationComponent: React.FC = () => {
  const notify = () => {
    toast.success("user" + ' te envio un mensaje', {position: toast.POSITION.TOP_CENTER});
  };
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    socket.emit('chat message', message);
    setMessage('');
  };
  
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  return (
    <div>
      <ToastContainer />
      <SocketComponent />
      {/* <UserComponent /> */}
 
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
              />
        <button onClick={() => {sendMessage(); notify();}}>Enviar</button>   
        </div>
  );
};
// 
export default NotificationComponent;


