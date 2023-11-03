import React, { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Notif.css';
import { IonInput } from '@ionic/react';
// import SocketComponent from '../components/SocketComponent';
import { useAuth } from '../context/AuthContext';
import { socket } from '../service/socket';

const NotificationComponent: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const notify = () => {
    if (currentUser) {
      toast.success(currentUser.nombres + ' ' + currentUser.apellidos + ' te envio un mensaje', {position: toast.POSITION.TOP_CENTER});
      return;
    }
  };

  const emitMessage = () => {
    socket.emit('chat message', {
      user: currentUser?.correo,
      mensaje: message
    });
  };
  // const sendNotification = () => {
  //   if (currentUser)
  //     socket.emit('notificacion', currentUser.nombres + ' ' + currentUser.apellidos + ' te envio un mensaje', {position: toast.POSITION.TOP_CENTER});
  //     return;
  // };

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
    socket.on('notificacion', (msg) => {
      
      notify();
    });

  }, [messages]);

  return (
    <div>
      <ToastContainer />
      {/* <SocketComponent /> */}
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
        <button onClick={() => {emitMessage();}}>Enviar</button>   
        </div>
  );
};
// 
export default NotificationComponent;