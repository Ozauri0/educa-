import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { add, construct, trash } from 'ionicons/icons'; // Importa los iconos de Ionicons que desees
import Header from './Header';
import { title } from 'process';

const Admin: React.FC = () => {

  const Registro = () => {
    window.location.href = '/Registro';
  }

  // Función para administrar cursos 
  const manageCourses = () => {
    //lógica para administrar cursos
  }

  // Función para eliminar usuarios
  const deleteUser = () => {
    //lógica para eliminar usuarios
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
            <IonButton color="danger" expand="block" href='/Eliminar'>Eliminar usuario</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
            <IonButton color="success" expand="block" href='/AgregarCurso'>Registrar curso</IonButton>
            </IonCol>
            <IonCol size="6">
            <IonButton color="danger" expand="block" href='/EliminarCurso'>Eliminar curso</IonButton>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol size="12">
            <IonButton className='boton' expand="block" href='/Notif'>Enviar notificacion global</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
