import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Inicio.css';
const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Educa +</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Educa +</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <img alt="Educa +" src="https://prensa.uct.cl/wp-content/uploads/2020/09/IMG_Educa-Blcakboard.png" />
          <IonCardHeader>
            <IonCardSubtitle>Curso principantes Educa +</IonCardSubtitle>
            <IonCardTitle>Bienvenido a Educa +</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Principal</p>
            <p>Principal1</p>
            <p>Principal2</p>
          </IonCardContent>
        </IonCard>
        <IonCard href='/tab4'>
          <img alt="Ayduantias" src="https://www.pedagogiapucv.cl/wp-content/uploads/2018/03/ayudantia2.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>Revisa tus solicitudes de ayudantia</IonCardSubtitle>
            <IonCardTitle>Solicitud Ayudantias</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Principal</p>
            <p>Principal1</p>
            <p>Principal2</p>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <img alt="Clases" src="https://prensa.uct.cl/wp-content/uploads/2019/04/300_sociologia.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>Revisa tu horario</IonCardSubtitle>
            <IonCardTitle>Horario Clases</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Principal</p>
            <p>Principal1</p>
            <p>Principal2</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
