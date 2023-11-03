import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
const socket = io('https://localhost:5000'); // Cambia la URL por la de tu servidor Socket.io

// const notify = (data: string) => {
//   toast.success(data, {position: toast.POSITION.TOP_CENTER});
//   return;
// }

const SocketComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [notif, setNotif] = useState<string>('');
  const { currentUser } = useAuth();


  
  useEffect(() => {
    // Escuchar eventos del servidor
    socket.on('chat message', (data: string) => {
      setMessage(data);
    });

    socket.on('notificacion', (data: string) => {
      // notify(data);
      
    });
    return () => {
      // Desconectar el socket al desmontar el componente
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Mensaje del servidor:</h1>
      <p>{message}</p>
    </div>
  );
};

export default SocketComponent;