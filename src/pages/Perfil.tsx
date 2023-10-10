import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonAvatar, IonItem, IonLabel,IonDatetime,IonGrid, IonCard, IonBadge, IonButton, IonButtons, IonCardTitle, IonCardHeader } from '@ionic/react';
import './Perfil.css';

const Perfil: React.FC = () => {
  const handleLogout = () => {
    // Redirigir al usuario al inicio de sesión
    window.location.href = '/Cuenta';
  };
  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <a href="/Inicio" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <img alt="Logo" src="https://i.imgur.com/EyZIJxu.png/" style={{ maxWidth: '40px', height: 'auto', marginLeft:'10px', marginRight: '-3px' }} />
        <IonTitle>Educa+</IonTitle>
        </div>
        </a>
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
          <IonButton color="primary" expand="block" href='/Recursos'>Ver Ayudantias</IonButton>
          </IonGrid>
        </IonCard>
        <IonGrid>
          <IonItem button onClick={() => window.open('https://www.uct.cl/')}>
            <IonLabel>Institución</IonLabel>
          </IonItem>
          <IonItem button>
            <IonLabel>Mensajes</IonLabel>
            <IonBadge color="primary" slot="end">3</IonBadge>
          </IonItem>
          <IonItem button href="/Cursos">
            <IonLabel>Cursos</IonLabel>
          </IonItem>
        </IonGrid>
        <IonGrid>
          {/* Otras opciones de perfil aquí */}
          <IonButton expand="full" color="danger" onClick={handleLogout}>
            Cerrar Sesión
          </IonButton>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;