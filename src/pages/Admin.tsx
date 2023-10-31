import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { add, construct, trash } from 'ionicons/icons'; // Importa los iconos de Ionicons que desees
import Header from './Header';
import { title } from 'process';

const Admin: React.FC = () => {
  // Función para redirigir a la página de Google (esto es solo un ejemplo)
  const Registro = () => {
    window.location.href = '/Registro';
  }

  // Función para administrar cursos (agrega tu lógica aquí)
  const manageCourses = () => {
    // Agrega la lógica para administrar cursos
  }

  // Función para eliminar usuarios (agrega tu lógica aquí)
  const deleteUser = () => {
    // Agrega la lógica para eliminar usuarios
  }

  return (
    <IonPage>
 
      <IonContent>
      <IonToolbar>
        <Header title='Panel administrativo Educa+' />
      </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
            <IonButton color="success" expand="block" href='/Registro'>Registrar usuario</IonButton>
            </IonCol>
            <IonCol size="6">
            <IonButton color="danger" expand="block" href='/Recursos'>Eliminar usuario</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
            <IonButton color="success" expand="block" href='/Recursos'>Agregar curso</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
            <IonButton color="danger" expand="block" href='/Recursos'>Eliminar curso</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
