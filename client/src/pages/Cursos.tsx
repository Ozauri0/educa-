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
  IonCardContent,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonBadge,
} from '@ionic/react'; import './Cursos.css';
import { getCursos, getNotifRequest } from '../api/auth';
import { Curso, Inscripcion } from '../types';
import { useAuth } from '../context/AuthContext';
import './Cursos.css';
import { registerInscripcion } from '../api/auth';
import { getInscripciones } from '../api/auth';
import { chevronBack, notificationsSharp } from 'ionicons/icons';
import {socket} from '../service/socket';
import { set } from 'react-hook-form';
const Cursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [inscritoCursos, setInscritoCursos] = useState<number[]>([]);
  const { currentUser } = useAuth()
  const [numNotif, setNumNotif] = useState(0);

 useEffect(() => {
        socket.on('new-comment', async(data: any) => {
            window.location.reload();
        }
        );
    }
        , []);

  const fetchCursos = async () => {
    try {
      const response = await getCursos()
      setCursos(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchInscripciones = async () => {
    try {
      const response = await getInscripciones(currentUser?.id);

      if (response.status === 200) {
        const data = await response.data

        // Extraer las ID de los cursos en los que el usuario está inscrito
        const inscripciones = data.map((inscripcion: Inscripcion) => inscripcion.id_curso);
        setInscritoCursos(inscripciones);
        // console.log('Inscripciones', inscripciones)
      } else {
        // Manejar errores si la respuesta no es exitosa
        console.error('Error al obtener inscripciones:', response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInscripciones();
    fetchCursos()
  }, [])

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

  console.log('Inscrito curso', inscritoCursos)
  console.log('Cursos', cursos)

  return (
    <IonPage>
      <IonContent>
      <IonHeader>
      <IonToolbar>
            <a href="/Inicio" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
                <IonTitle className="educa-plus-title">Cursos </IonTitle>
                <IonButton href="/Notificaciones">
                    <IonIcon slot="icon-only" icon={notificationsSharp}/>
                    <IonBadge color="danger">{numNotif}</IonBadge>
                </IonButton>
                <IonButton href="javascript:history.back()">
                    <IonIcon slot="icon-only" icon={chevronBack} />
                </IonButton>
            </div>
            </a> 
            </IonToolbar>
        </IonHeader>
        {cursos.map((curso: Curso) => (
          <IonCard key={curso.id}>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-md="6" offset-md="3">
                  <IonImg src={`http://localhost:4000/uploads/cursos/${curso.id}/banner`} />
                  <IonCardHeader>
                    <IonCardTitle>{curso.nombre_curso}</IonCardTitle>
                    <IonCardSubtitle>{curso.descripcion}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Inicio: {new Date(curso.fecha_inicio).toLocaleDateString()}</p>
                    <p>Fin: {new Date(curso.fecha_termino).toLocaleDateString()}</p>
                    <p>Cupos: {curso.cupos_restantes} / {curso.limite_cupos}</p>
                  </IonCardContent>
                  <IonButton href={`/Curso/${curso.id}`}>Ir al curso</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
}

export default Cursos;
