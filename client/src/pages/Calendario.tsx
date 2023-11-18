import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Calendario.css';

const Calendario: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <a href="/Inicio" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img alt="Logo" src="https://i.imgur.com/EyZIJxu.png/" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
              <IonTitle>Educa+</IonTitle>
            </div>
          </a>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center ion-padding" fullscreen>
        <div className="calendly-inline-widget" data-url="https://calendly.com/christian_uct/asesoria" style={{ width: '100%', height: '100%' }}/>
      </IonContent>
    </IonPage>
  );
};

export default Calendario;