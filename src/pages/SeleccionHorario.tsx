import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/react';

const SeleccionHorarios: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Lunes');
  const [selectedTime, setSelectedTime] = useState<string>('15:00');

  //npm install npm install googleapis
  //npm install google-auth-library

  const handleGoogleSignIn = () => {
    // Implementar login con Google aquí
    // Idealmente deberiamos tomar el mismo correo institucional que se ingresó en el formulario de registro

  };

  const createGoogleCalendarEvent = async () => {
    // Implementar la lógica para crear un evento en Google Calendar aquí
    // Se requiere hacer cambios en el banckend para que se pueda crear el evento
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Seleccionar Horario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Día:</IonLabel>
          <IonSelect
            value={selectedDay}
            onIonChange={(e) => setSelectedDay(e.detail.value)}
          >
            <IonSelectOption value="Lunes">Lunes</IonSelectOption>
            <IonSelectOption value="Martes">Martes</IonSelectOption>
            <IonSelectOption value="Miércoles">Miércoles</IonSelectOption>
            <IonSelectOption value="Jueves">Jueves</IonSelectOption>
            <IonSelectOption value="Viernes">Viernes</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Hora:</IonLabel>
          <IonSelect
            value={selectedTime}
            onIonChange={(e) => setSelectedTime(e.detail.value)}
          >
            <IonSelectOption value="15:00">15:00</IonSelectOption>
            <IonSelectOption value="16:00">16:00</IonSelectOption>
            <IonSelectOption value="17:00">17:00</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonButton expand="full" onClick={createGoogleCalendarEvent}>
          Agregar al Google Calendar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SeleccionHorarios;
