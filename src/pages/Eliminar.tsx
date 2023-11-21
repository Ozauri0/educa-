import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar, IonButton, IonAlert } from '@ionic/react';
import axios from 'axios';
import './Eliminar.css';

const Eliminar: React.FC = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroRut, setFiltroRut] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<any>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios');
        const usuariosData = response.data.filter((item: any) => Array.isArray(item));
        setUsuarios(usuariosData[0]);
        console.log(usuariosData[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsuarios();
  }, []);
    

  const handleFiltroRutChange = (e: CustomEvent) => {
    setFiltroRut(e.detail.value!);
  };

  const handleEliminarUsuario = async (id: string) => {
    const usuario = usuarios.find((usuario: any) => usuario.id === id);
    setUsuarioSeleccionado(usuario);
  };

  const handleConfirmEliminar = async () => {
    try {
      await axios.get(`http://192.168.1.167:4000/api/eliminar/${usuarioSeleccionado?.id}`);
      // Actualizar la lista de usuarios después de eliminar
      const response = await axios.get('http://localhost:4000/api/usuarios');
      const usuariosData = response.data.filter((item: any) => Array.isArray(item));
      setUsuarios(usuariosData[0]);
    } catch (error) {
      console.log(error);
    }
    setUsuarioSeleccionado(null);
  };

  const handleCancelarEliminar = () => {
    setUsuarioSeleccionado(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Eliminar Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar value={filtroRut} onIonChange={handleFiltroRutChange}></IonSearchbar>
        <IonList className='textolista'>
          {usuarios
            .filter((usuario: any) => usuario.rut.includes(filtroRut))
            .map((usuario: any, index: number) => (
              <IonItem key={index}>
                <IonLabel>
                  <p>ID: {usuario.id}</p>
                  <p>Nombres: {usuario.nombres} {usuario.apellidos}</p>
                  <p>RUT: {usuario.rut}</p>
                </IonLabel>
                <IonButton color="danger" onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</IonButton>
              </IonItem>
            ))}
        </IonList>

        <IonAlert className='alerta'
  isOpen={usuarioSeleccionado !== null}
  onDidDismiss={handleCancelarEliminar}
  header="Confirmar eliminación"
  message={`¿Estás seguro de que quieres eliminar al usuario "${usuarioSeleccionado?.nombres} ${usuarioSeleccionado?.apellidos}",
  con el rut ${usuarioSeleccionado?.rut}"?`}
  buttons={[
    {
      text: "Cancelar",
      role: "cancel",
      handler: handleCancelarEliminar,
    },
    {
      text: "Eliminar",
      handler: handleConfirmEliminar,
    },
  ]}
/>
      </IonContent>
    </IonPage>
  );
};

export default Eliminar;