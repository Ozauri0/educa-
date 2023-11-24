import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonBadge } from '@ionic/react';
import './Inicio.css';
import { socket } from '../service/socket';
import { chevronBack, notificationsSharp } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import { getNotifRequest } from '../api/api';

const Tab1: React.FC = () => {
  const [numNotif, setNumNotif] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    socket.on('new-comment', async (data: any) => {
      window.location.reload();
    }
    );
  }
    , []);

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
      <IonHeader>
        <IonToolbar>
          <a href="/Inicio" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
              <IonTitle className="educa-plus-title">Inicio </IonTitle>
              <IonButton href="/Notificaciones">
                <IonIcon slot="icon-only" icon={notificationsSharp} />
                <IonBadge color="danger">{numNotif}</IonBadge>
              </IonButton>
              <IonButton href="javascript:history.back()">
                <IonIcon slot="icon-only" icon={chevronBack} />
              </IonButton>
            </div>
          </a>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <img alt="Educa +" src="https://prensa.uct.cl/wp-content/uploads/2020/09/IMG_Educa-Blcakboard.png" />
          <IonCardHeader>
            <IonCardSubtitle>Curso principantes Educa +</IonCardSubtitle>
            <IonCardTitle>Bienvenido a Educa +</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>aqui podras encontrar cursos para poder utilizar educa+ de forma correcta</p>
          </IonCardContent>
        </IonCard>
        <IonCard href='/Calendario'>
          <img alt="Ayduantias" src="https://www.pedagogiapucv.cl/wp-content/uploads/2018/03/ayudantia2.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>Puedes solicitar una ayudantia mucho mas facil ahora</IonCardSubtitle>
            <IonCardTitle>Solicita una Ayudantia</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Solicita ayudantias utiles para tus cursos!</p>
          </IonCardContent>
        </IonCard>
        <IonCard href='/Foro'>
          <img alt="Clases" src="https://prensa.uct.cl/wp-content/uploads/2019/04/300_sociologia.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>Puedes visitar el foro!</IonCardSubtitle>
            <IonCardTitle>Foro educa +</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Bienvenido al foro principal de educa+!</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;