import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonAvatar, IonItem, IonLabel,IonDatetime,IonGrid, IonCard, IonBadge, IonButton, IonButtons, IonCardTitle, IonCardHeader } from '@ionic/react';
import './Cursos.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonAvatar slot="start">
            <img alt="Educa +" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </IonAvatar>
          <IonLabel>
            <h2>Nombre</h2>
            <h3>Apellido</h3>
            <p>Correo</p>
          </IonLabel>
        </IonItem>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Ayudantias</IonCardTitle>
          </IonCardHeader>
          <IonGrid>
              <IonItem>
                <IonBadge color="primary" slot="end">3</IonBadge>
                <IonLabel>Ayudantias pendientes</IonLabel>
              </IonItem>
              <IonItem>
                <IonBadge color="warning" slot="end">1</IonBadge>
                <IonLabel>Ayudantias Perdidas</IonLabel>
              </IonItem>
          <IonButton color="primary" expand="block" href='/hAyudantias'>Ver Ayudantias</IonButton>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;