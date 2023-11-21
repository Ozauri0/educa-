import React, { useEffect, useState } from 'react';
import { IonBadge, IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ChatbotLauncher from './ChatbotButton';
import Header from './Header';
import './Calendario.css';
import { chevronBack, notificationsSharp } from 'ionicons/icons';
import {socket} from '../service/socket';
import { useAuth } from '../context/AuthContext';
import { getNotifRequest } from '../api/auth';


const Calendario: React.FC = () => {
  const [numNotif, setNumNotif] = useState(0);
  const { currentUser } = useAuth();

 useEffect(() => {
        socket.on('new-comment', async(data: any) => {
            window.location.reload();
        }
        );
    }
        , []);
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);
  useEffect(() => {
    async function getNotifications() {
        if (currentUser) {
            try {
                const response = await getNotifRequest({
                    id: currentUser.id,
                });
                const data = response.data;
                setNumNotif(data.length); // Actualiza el estado con los datos recibidos
            } catch (error) {
                console.error(error);
            }
        }
    }
    getNotifications();
}, [currentUser]);


  return (
    <IonPage>
      <IonToolbar>
          <a href="/Inicio" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
              <IonTitle className="educa-plus-title">Asesoría</IonTitle>
              <IonButton href="/Notificaciones">
                  <IonIcon slot="icon-only" icon={notificationsSharp}/>
                  <IonBadge color="danger">{numNotif}</IonBadge>
              </IonButton>
              <IonButton href='/Foro'>
                  <IonIcon slot="icon-only" icon={chevronBack} />
              </IonButton>
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
