import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import axios from 'axios';
import './Eliminar.css';

const Eliminar: React.FC = () => {
  const [users, setUsers] = useState<null | any[]>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [rut, setRut] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>(""); 
    const [telefono, setTelefono] = useState<string>("");
  const fetchUsers = async () => {
    try {
    const res = await fetch("http://localhost:4000/api/getDocentes", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombres: nombre,
            apellidos: apellido,
            rut: rut,
            correo: email,
            contrasena: password,
            telefono: telefono,
            }),
        })
        const data = await res.json();
        console.log(data);
    } catch (error) {
 
      console.log(error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`/api/getUsers${userId}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <IonContent>
        {users === null ? (
          <div>Cargando...</div>
        ) : (
          <IonList>
            {users.map((user: any) => (
              <IonItem key={user.id}>
                <IonLabel>{user.nombres} {user.apellidos}</IonLabel>
                <IonButton
                  color='danger'
                  onClick={() => setSelectedUserId(user.id)}
                >
                  Eliminar
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
        {selectedUserId && (
          <IonButton
            onClick={() => {
              handleDeleteUser(selectedUserId);
              setSelectedUserId(null);
            }}
            expand='full'
            color='danger'
          >
            Confirmar Eliminación
          </IonButton>
        )}
      </IonContent>
    </>
  );
};

export default Eliminar;