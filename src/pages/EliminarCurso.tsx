import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonAlert } from '@ionic/react';
import { deleteCurso, getCursos } from '../api/auth';

const EliminarCurso: React.FC = () => {
  const [cursos, setCursos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState('');

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await getCursos();
      const cursosData = response.data;
      setCursos(cursosData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminarCurso = async (cursoId: string) => {
    try {
      await deleteCurso(cursoId);
      fetchCursos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Eliminar Curso</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {cursos.map((curso: any) => (
            <IonItem key={curso.id}>
              <IonLabel>{curso.nombre_curso}</IonLabel>
              <IonButton color="danger" slot="end" onClick={() => {
                setSelectedCurso(curso.id);
                setShowAlert(true);
              }}>
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Eliminar Curso"
          message="¿Estás seguro de que quieres eliminar este curso?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setSelectedCurso('');
              }
            },
            {
              text: 'Eliminar',
              handler: () => {
                handleEliminarCurso(selectedCurso);
                setSelectedCurso('');
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default EliminarCurso;