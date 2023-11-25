import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonBadge,
} from '@ionic/react'; import './Cursos.css';
import { getCursos, getInscripciones } from '../api/cursos';
import { getNotifRequest } from '../api/api';
import { Curso, Inscripcion } from '../types';
import { chevronBack, notificationsSharp } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import { socket } from '../service/socket';
import './Cursos.css';

const Cursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([])
  const { currentUser } = useAuth()
  const [numNotif, setNumNotif] = useState(0);


  useEffect(() => {
    socket.on('new-comment', async (data: any) => {
      window.location.reload();
    });
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

  const fetchCursos = async () => {
    try {
      const response = await getCursos()
      setCursos(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCursos()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <a href="/Inicio" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
              <IonTitle className="educa-plus-title">Cursos </IonTitle>
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cursos</IonTitle>
          </IonToolbar>
        </IonHeader>
        {cursos.map((curso: Curso) => (
          <IonCard key={curso.id} href={`/Curso/View/${curso.id}`}>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-md="6" offset-md="3">
                  <IonImg src={`${process.env.REACT_APP_BACKEND_URL}/uploads/cursos/${curso.id}/banner`} />
                  <IonCardHeader>
                    <IonCardTitle>{curso.nombre_curso}</IonCardTitle>
                    <IonCardSubtitle>{curso.descripcion}</IonCardSubtitle>
                  </IonCardHeader>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Cursos;
