import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonButton, IonRouterLink } from '@ionic/react';
import './Cuenta.css';

const Cuenta: React.FC = () => {
  const [email, setUsuario] = useState<string>('');
  const [password, setContraseña] = useState<string>('');

  const handleInicioSesion = async () => {
    // Aquí puedes agregar la lógica para iniciar sesión utilizando los valores de usuario y contraseña
    // Por ejemplo, puedes enviar una solicitud de inicio de sesión al servidor.

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailRegex.test(email)) {
      const result = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        correo: email,
        contrasena: password 
      })
      })
    }
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
              value={email}
              placeholder="Usuario"
              onIonChange={(e) => setUsuario(e.detail.value!)}
            ></IonInput>
            <IonInput
              type="password"
              value={password}
              placeholder="Contraseña"
              onIonChange={(e) => setContraseña(e.detail.value!)}
            ></IonInput>
            <IonButton expand="full" onClick={handleInicioSesion}>
              Iniciar Sesión
            </IonButton>
            <IonButton expand="full" routerLink='/Registro'>Registrarse</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Cuenta;
