import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import Header from './Header';
import { registerNewCurso } from '../api/auth';

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
            // Sin función de error, ya que no se espera que falle.
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
                        <IonSelect value={cupos} onIonChange={e => setCupos(e.detail.value)}>
                            {Array.from({ length: 51 }, (_, index) => (
                                <IonSelectOption key={index} value={index}>{index}</IonSelectOption>
                            ))}
                        </IonSelect>
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
                <IonButton expand="block" onClick={handleAgregarCurso}>Agregar Curso</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default AgregarCurso;