import React, { useEffect } from 'react';
import { socket } from '../service/socket';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SocketContainer = ({ children } : any) => {
    const { currentUser } = useAuth();
  
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
  
    const notify = (msg : string, msg2 : string, msg3 : string) => {
      // toast.success(currentUser?.nombres + ' ' + currentUser?.apellidos + ' te envio un mensaje: ' + msg3, {position: toast.POSITION.TOP_CENTER});
        
    };
    
    const emitNotif = (tipo : string) => {
        if (tipo === "chat") {
          socket.emit('chat message', currentUser?.correo, "Te envio un mensaje:", message);
        }
        if (tipo === "foro") {
          socket.emit('foro message', currentUser?.correo, "Te envio un mensaje:", message);
        }
        setMessage('');
      };
  
    useEffect(() => {
      socket.on("chat message", (msg1, msg2, msg3) => {
        setMessages([...messages, msg3]);
      });
    }, [messages]);
   
    useEffect(() => {
      socket.on('notificacion', (msg1, msg2, msg3) => {
        notify(msg1, msg2, msg3);
      });
    }, []); // El segundo parámetro del useEffect asegura que este efecto se ejecute solo una vez al montar el componente

  return <>{children}</>;
};

export default SocketContainer;
