import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://localhost:5000'); // Cambia la URL por la de tu servidor Socket.io

const SocketComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Escuchar eventos del servidor
    socket.on('chat message', (data: string) => {
      setMessage(data);
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