import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime, IonItem, IonLabel } from '@ionic/react';
import './Recursos.css';

const Calendario: React.FC = () => {
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
      <IonContent className="ion-text-center ion-padding" fullscreen>
        <IonItem className="ion-text-center">
          <IonLabel className="ion-text-center"> <b>Horarios de clase</b></IonLabel>
        </IonItem>
        <IonItem>
          <IonDatetime
            placeholder="Select Date"
            presentation="date"
            highlightedDates={[
              {
                date: '2023-09-07',
                textColor: '#09721b',
                backgroundColor: '#c8e5d0',
              },
              {
                date: '2023-09-08',
                textColor: '#09721b',
                backgroundColor: '#c8e5d0',
              },
              {
                date: '2023-09-09',
                textColor: '#09721b',
                backgroundColor: '#c8e5d0',
              },
            ]}
          ></IonDatetime>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Calendario;
