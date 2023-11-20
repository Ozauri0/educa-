import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ChatbotLauncher from './ChatbotButton';
import Header from './Header';
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
      <IonToolbar>
            <a href="/Inicio" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
                <IonTitle className="educa-plus-title">Asesoría</IonTitle>
              </div>
            </a>
      </IonToolbar>
      <IonContent className="calendar-style" fullscreen>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/christian_uct/asesoria"
          style={{ width: '100%', height: '100%' }}
        />
      </IonContent>
      <ChatbotLauncher />
    </IonPage>
  );
};

export default Calendario;
