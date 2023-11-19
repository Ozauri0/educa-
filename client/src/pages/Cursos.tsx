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
} from '@ionic/react'; import './Cursos.css';
import { getCursos } from '../api/auth';
import { Curso, Inscripcion } from '../types';
import { useAuth } from '../context/AuthContext';
import './Cursos.css';
import { registerInscripcion } from '../api/auth';
import { getInscripciones } from '../api/auth';

const Cursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [inscritoCursos, setInscritoCursos] = useState<number[]>([]);
  const { currentUser } = useAuth()

  const handleInscripcion = async (id_curso: number) => {

    try {
      const inscripcion: Inscripcion = { id_curso: id_curso, id_docente: currentUser?.id }
      const response = await registerInscripcion(inscripcion);

      if (response.status == 200) {
        // Manejar el éxito de la operación
        console.log('Inscripción exitosa');
        fetchInscripciones();
        fetchCursos();
      } else {
        // Manejar errores
        console.error('Error al realizar la inscripción');
      }
    } catch (error) {
      console.error('Error al realizar la inscripción', error);
    }
  };

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

  console.log('Inscrito curso', inscritoCursos)
  console.log('Cursos', cursos)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Educa +</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cursos</IonTitle>
          </IonToolbar>
        </IonHeader>
        {cursos.map((curso: Curso) => (
          <IonCard key={curso.id}>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-md="6" offset-md="3">
                  <IonImg src="https://prensa.uct.cl/wp-content/uploads/2014/10/csangre.jpg" />
                  <IonCardHeader>
                    <IonCardTitle>{curso.nombre_curso}</IonCardTitle>
                    <IonCardSubtitle>{curso.descripcion}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Inicio: {new Date(curso.fecha_inicio).toLocaleDateString()}</p>
                    <p>Fin: {new Date(curso.fecha_termino).toLocaleDateString()}</p>
                    <p>Cupos: {curso.cupos_restantes} / {curso.limite_cupos}</p>
                    {/* <p>Cupos restantes: {curso.cupos_restantes}</p> */}
                  </IonCardContent>
                  <IonButton href={`/Curso/${curso.id}`}>Ir al curso</IonButton>
                  {/* {inscritoCursos.includes(curso.id) ? (
                    <IonButton color='danger' expand="block" onClick={() => handleInscripcion(curso.id)}>
                      Desinscribirse
                    </IonButton>
                  ) : (
                    <IonButton expand="block" onClick={() => handleInscripcion(curso.id)}>
                      Inscribirse
                    </IonButton>
                  )} */}
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
