import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Notif.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getNotifRequest } from '../api/auth';

// const retrievePosts = async (dato: string) => {
//   const response = await axios.post(
//     "https://localhost:4000/notificaciones",
//     { correo: dato }
//   );
//   return response.data;
// };


// const retrievePosts = async (dato: any) => {
//   const response = await fetch('http://localhost:4000/api/notificaciones', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       },
//     body: JSON.stringify({
//       correo: dato,
//       }),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       });
//       return response;
// };

const NotificacionesComponent: React.FC = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    async function adgjadg(dato : any) {
      const response = await fetch('http://localhost:4000/api/notificaciones', {
        method: 'POST',
        headers: {          'Content-Type': 'application/json',          },
        body: JSON.stringify({          correo: dato,          }),        })
        .then((res) =>{res.json();})
        .then((data) => {
          console.log(data);
          });
          return response;

    }
    setPosts(adgjadg(currentUser?.correo));
  }, [currentUser]);
  
  
  return (
    <div>
      {

      }
    </div>
  );
};
  // useEffect(() => {
  //   async function adgjadg() {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json' },
  //       body: JSON.stringify({usuario: currentUser?.correo})
  //     };  
  //     const response = await fetch('https://localhost:4000/api/notificaciones', requestOptions)
  //     const data = await response.json();
  //     setPosts(data);
  //   }
  // }, []);

  
  // const response : any = fetch('http://localhost:4000/api/notificaciones', {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json' },
  //   body: JSON.stringify({correo: currentUser?.correo,})
  //   })
  //   .then((res) => res.json())
  //   .then((response) => {
  //     console.log(response);
  //     });
//  posts.map((post: any) => (
//         <div key={post.id}>
//           <h1>{post.usuario}</h1>
//           <p>{post.descripcion}</p>
//         </div>
//       )) 
      
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
     
// return (
//   {posts.map((post: any) => (
//     <div>
//       <h1>{post.titulo}</h1>
//       <p>{post.descripcion}</p>
//     </div>
//   ))}
//   );
export default NotificacionesComponent;
