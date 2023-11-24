import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { registerNewCurso } from '../api/cursos';
import './AgregarCurso.css';

interface Curso {
    id: string;
    nombre_curso: string;
    descripcion: string;
    limite_cupos: number;
    fecha_inicio: string;
    fecha_termino: string;
}

const AgregarCurso: React.FC = () => {
    const [nombreCurso, setNombreCurso] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cupos, setCupos] = useState('');
    const [fechaInicio, setFechaInicio] = useState<string>('');
    const [fechaTermino, setFechaTermino] = useState<string>('');
    const [showToast, setShowToast] = useState(false);
    const history = useHistory();

    const handleAgregarCurso = async () => {
        const curso: Curso = {
            id: '',
            nombre_curso: nombreCurso,
            descripcion: descripcion,
            limite_cupos: parseInt(cupos),
            fecha_inicio: fechaInicio,
            fecha_termino: fechaTermino
        };

        try {
            await registerNewCurso(curso);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                history.push('/cursos');
            }, 2000);
        } catch (error) {
            // sin función de error.
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <Header title="Agregar Curso" />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Nombre del curso</IonLabel>
                        <IonInput value={nombreCurso} onIonChange={e => setNombreCurso(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Descripción</IonLabel>
                        <IonInput value={descripcion} onIonChange={e => setDescripcion(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Límite de cupos</IonLabel>
                        <IonInput
                            min={0}
                            value={cupos || ''}
                            type='number'
                            onIonChange={e => setCupos(e.detail.value || '')}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Fecha de inicio</IonLabel>
                        <IonInput type="date" value={fechaInicio} onIonChange={e => setFechaInicio(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Fecha de término</IonLabel>
                        <IonInput type="date" value={fechaTermino} onIonChange={e => setFechaTermino(e.detail.value!)}></IonInput>
                    </IonItem>
                </IonList>
                <IonButton expand="block" color="success" onClick={handleAgregarCurso}>Agregar Curso</IonButton>
                <IonToast
                    isOpen={showToast}
                    message="Curso agregado exitosamente"
                    duration={2000}
                    position='top'
                    color={'success'}
                />
            </IonContent>
        </IonPage>
    );
};

export default AgregarCurso;