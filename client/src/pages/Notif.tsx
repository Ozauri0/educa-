import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { socket } from '../service/socket';
import { IonPage } from '@ionic/react';

const NotificationComponent: React.FC = () => {
  const { currentUser } = useAuth();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const notify = (msg: string, msg2: string, msg3: string) => {

    toast.success(currentUser?.nombres + ' ' + currentUser?.apellidos + ' te envio un mensaje: ' + msg3, { position: toast.POSITION.TOP_CENTER });

  };

  const emitNotif = (tipo: string) => {
    if (tipo === "chat") {
      socket.emit('foro message', currentUser?.correo, "Te envio un mensaje:", message);
      socket.emit('notificacion', currentUser?.correo, "Te envio un mensaje:", message);
    }
    if (tipo === "foro") {
      socket.emit('new foro', currentUser?.correo, "Creo el siguiente foro:", message);
    }
    setMessage('');
  };

  useEffect(() => {
    socket.on("foro message", (msg1, msg2, msg3) => {
      setMessages([...messages, msg3]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on('notificacion', (msg1, msg2, msg3) => {
      notify(msg1, msg2, msg3);
    });
  }, []);

  return (
    <IonPage>
      <div>
        <ToastContainer />
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
        <button onClick={() => { emitNotif("chat") }}>Enviar</button>
      </div>
    </IonPage>
  );
};
export default NotificationComponent;