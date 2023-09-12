import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonButton, IonRouterLink } from '@ionic/react';
import './Inicio.css';

const Cuenta: React.FC = () => {
  const [usuario, setUsuario] = useState<string>('');
  const [contraseña, setContraseña] = useState<string>('');

  const handleInicioSesion = () => {
    // Aquí puedes agregar la lógica para iniciar sesión utilizando los valores de usuario y contraseña
    // Por ejemplo, puedes enviar una solicitud de inicio de sesión al servidor.
  };

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
            <IonCardTitle>Iniciar Sesión</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Para iniciar sesión en Educa +, debes ingresar tu correo institucional y tu contraseña.</p>
            <p>Si no tienes una cuenta, puedes crear una en el siguiente enlace:</p>
            <IonRouterLink routerLink="/registro">Registrarse</IonRouterLink> {/* Enlace al formulario de registro */}
            <IonInput
              value={usuario}
              placeholder="Usuario"
              onIonChange={(e) => setUsuario(e.detail.value!)}
            ></IonInput>
            <IonInput
              type="password"
              value={contraseña}
              placeholder="Contraseña"
              onIonChange={(e) => setContraseña(e.detail.value!)}
            ></IonInput>
            <IonButton expand="full" routerLink='/Inicio'>
              Iniciar Sesión
            </IonButton>
            <IonButton expand="full" routerLink="/registro">Registrarse</IonButton> {/* Botón de registro */}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Cuenta;
