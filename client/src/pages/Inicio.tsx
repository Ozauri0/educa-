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
            <p>aqui podras encontrar cursos para poder utilizar educa+ de forma correcta</p>
          </IonCardContent>
        </IonCard>
        <IonCard href='/Calendario'>
          <img alt="Ayduantias" src="https://www.pedagogiapucv.cl/wp-content/uploads/2018/03/ayudantia2.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>Puedes solicitar una ayudantia mucho mas facil ahora</IonCardSubtitle>
            <IonCardTitle>Solicita una Ayudantia</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Solicita ayudantias utiles para tus cursos!</p>
          </IonCardContent>
        </IonCard>
        <IonCard href='/Foro'>
          <img alt="Clases" src="https://prensa.uct.cl/wp-content/uploads/2019/04/300_sociologia.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>Puedes visitar el foro!</IonCardSubtitle>
            <IonCardTitle>Foro educa +</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Bienvenido al foro principal de educa+!</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
