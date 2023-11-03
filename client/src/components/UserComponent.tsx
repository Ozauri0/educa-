// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { JwtPayload, jwtDecode } from "jwt-decode";
// import { partialUtil } from 'zod/lib/helpers/partialUtil';

function UserComponent() {
  
//   const [userData, setUserData] = useState({});
//   const [token, setToken] = useState<string>('');

//   useEffect(() => {
//     // Realizar una solicitud al endpoint donde se encuentra la función verifyToken
//     axios.get('/api/verify')
//       .then(response => {
//         // Los datos del usuario se encuentran en la respuesta
        
//         setUserData(response.data);
//         setToken(response.data.token);
//       })
//       .catch(error => {
//         // Manejar errores, como la falta de autorización o problemas en el servidor
//         console.error('Error al obtener datos del usuario:', error);
//       });
//   }, []);


//   // Decodifica el token
//   const decoded = jwtDecode(token);
  
//   // Ahora, puedes acceder a los datos del usuario
//   // const id = decoded.id
//   // const nombres = decoded.nombres
//   // const apellidos = decoded.apellidos
  
//   // Otros datos
//   interface User {
//     id: number;
//     nombre: string;
//     email: string;
//   }
//   const user: User = { id: id, nombre: nombres, email: apellidos };
//   console.log(user.nombre);
//   return (
//     <div>
//       <h2>Información del Usuario</h2>
//       <p>Nombre: {user.nombre}</p>
//       <p>Email: {user.email}</p>
//       {/* Otros campos del usuario */}
//     </div>
//   );
}

export default UserComponent;