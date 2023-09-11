import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Inicio.css';
const Login: React.FC = () => {
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
          <IonCardHeader>
            <IonCardTitle>Iniciar Sesion</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Para iniciar sesion en Educa +, debes ingresar tu correo institucional y tu contraseña.</p>
            <p>Si no tienes una cuenta, puedes crear una en el boton de abajo.</p>
          </IonCardContent>
          

        </IonCard>  
        
        
        </IonContent>
    </IonPage>
  );
};

export default Login;
