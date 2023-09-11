import React, { useState } from 'react';
import {
  IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle,IonInput,IonButton,IonText,
} from '@ionic/react';
import './Registro.css';
import Rut from 'rut.js'; {/* Importar la librería para validar RUT, "npm install rut.js"*/}

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [rut, setRut] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [rutValido, setRutValido] = useState<boolean>(true);
  const [emailValido, setEmailValido] = useState<boolean>(true);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  const handleRegistro = () => {
    // Verificar si las contraseñas coinciden y que no estén vacías
    if (password === confirmPassword && password !== '') {
      // Verificar si el RUT es válido
      if (Rut.validate(rut)) {
        // Verificar si el correo es válido
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (emailRegex.test(email)) {
          // Todas las condiciones son verdaderas, enviar la información
          console.log('Registro exitoso:');
          console.log('Nombre:', nombre);
          console.log('RUT:', rut);
          console.log('Correo Electrónico:', email);
          console.log('Contraseña:', password);
          setPasswordMatch(true); // Restablecer la coincidencia de contraseñas
        } else {
          setEmailValido(false); // Marcar el correo como inválido
        }
      } else {
        setRutValido(false); // Marcar el RUT como inválido
      }
    } else {
      setPasswordMatch(false);
    }
  };

  const validarRut = (inputRut: string) => {
    if (Rut.validate(inputRut)) {
      setRutValido(true);
    } else {
      setRutValido(false);
    }
  };

  const validarEmail = (inputEmail: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailRegex.test(inputEmail)) {
      setEmailValido(true);
    } else {
      setEmailValido(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Registro</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              value={nombre}
              placeholder="Nombre"
              onIonChange={(e) => setNombre(e.detail.value!)}
            ></IonInput>
            <IonInput
              value={rut}
              placeholder="RUT"
              onIonChange={(e) => {
                setRut(e.detail.value!);
                validarRut(e.detail.value!);
              }}
              className={rutValido ? '' : 'invalid'}
            ></IonInput>
            {!rutValido && <IonText color="danger">RUT inválido</IonText>}
            <IonInput
              value={email}
              placeholder="Correo Electrónico"
              onIonChange={(e) => {
                setEmail(e.detail.value!);
                validarEmail(e.detail.value!);
              }}
              className={emailValido ? '' : 'invalid'}
            ></IonInput>
            {!emailValido && <IonText color="danger">Correo electrónico inválido</IonText>}
            <IonInput
              type="password"
              value={password}
              placeholder="Contraseña"
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
            <IonInput
              type="password"
              value={confirmPassword}
              placeholder="Confirmar Contraseña"
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              className={passwordMatch ? '' : 'invalid'}
            ></IonInput>
            {!passwordMatch && <IonText color="danger">Las contraseñas no coinciden</IonText>}
            <IonButton expand="full" onClick={handleRegistro}>
              Registrarse
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Registro;
