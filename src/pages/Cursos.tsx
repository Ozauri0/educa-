import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Cursos.css';

const Cursos: React.FC = () => {
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
            <IonTitle size="large">Cursos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <img alt="Curso 1" src="https://prensa.uct.cl/wp-content/uploads/2014/10/csangre.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>Estudiantes UC Temuco ingreso 2020</IonCardSubtitle>
            <IonCardTitle>Perfil Tecnologico 2022</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <img alt="Curso 2" src="https://econtinua.uct.cl/wp-content/uploads/2022/09/dimensiones-personalizadas-720x500-px-6-3.jpeg" />
          <IonCardHeader>
            <IonCardSubtitle>Perfil docente UC Temuco</IonCardSubtitle>
            <IonCardTitle>Perfil Docente 2022</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <img alt="Curso 3" src="https://impulso06.com/wp-content/uploads/2022/11/Las-Tic-en-Educacion.png" />
          <IonCardHeader>
            <IonCardSubtitle>Informe de resultados</IonCardSubtitle>
            <IonCardTitle>Practicas con TIC</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Cursos;
