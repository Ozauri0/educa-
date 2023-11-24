import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonCardTitle,
  IonTitle,
  IonButtons,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonInput,
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';


import './ForoPost.css';
import { useAuth } from '../context/AuthContext';

function ForoNuevo() {
  const { currentUser } = useAuth();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleNuevo = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/foronuevo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: titulo,
        descripcion: descripcion,
        id_autor: currentUser?.id,
        autor: currentUser?.correo,
      })
    })
    const data = await res.json();
    if (res.status === 200) {
      window.location.href = '/Foro';
    }
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nuevo Post</IonTitle>
          <IonButtons slot='end'>
            <IonButton href='/Foro'>
              <IonIcon slot="icon-only" icon={chevronBack} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Titulo</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              value={titulo}
              placeholder="Titulo"
              onIonChange={(e) => setTitulo(e.detail.value!)}
            />
            <IonInput
              value={descripcion}
              placeholder="Descripcion"
              onIonChange={(e) => setDescripcion(e.detail.value!)}
            />
            <IonButton onClick={handleNuevo}>Publicar</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </>
  );
}
export default ForoNuevo;