import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import './Cuenta.css';
const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <a href="/Inicio" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
              <IonTitle className="educa-plus-title"><b>Educa+</b></IonTitle>
            </div>
          </a>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Educa+</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Iniciar Sesion</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Para iniciar sesion en Educa+, debes ingresar tu correo institucional y tu contraseña.</p>
            <p>Si no tienes una cuenta, puedes crear una en el boton de abajo.</p>
          </IonCardContent>


        </IonCard>


      </IonContent>
    </IonPage>
  );
};

export default Login;
