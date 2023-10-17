import React from 'react';
import { IonContent, IonDatetime, IonItem, IonList, IonSelect, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonSelectOption, IonLabel } from '@ionic/react';
import './Asesoria.css';

const Asesoria: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Educa +</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                <img alt="Curso 1" src="https://prensa.uct.cl/wp-content/uploads/2014/10/csangre.jpg" />
                <IonList>
                    <IonItem>
                        <IonSelect label='Curso' placeholder="Seleccione un curso">
                            <IonSelectOption value="1">Curso 1</IonSelectOption>
                            <IonSelectOption value="2">Curso 2</IonSelectOption>
                            <IonSelectOption value="3">Curso 3</IonSelectOption>
                            <IonSelectOption value="4">Curso 4</IonSelectOption>
                            <IonSelectOption value="5">Curso 5</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonSelect label='Profesor' placeholder="Seleccione un Profesor">
                            <IonSelectOption value="1">Profesor 1</IonSelectOption>
                            <IonSelectOption value="2">Profesor 2</IonSelectOption>
                            <IonSelectOption value="3">Profesor 3</IonSelectOption>
                            <IonSelectOption value="4">Profesor 4</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Fechas Disponibles</IonLabel>
                    </IonItem>
                    <IonItem><IonDatetime
                    presentation='date-time'
                    preferWheel = {true}
                    min='2023-10-04'
                    max='2023-10-08'
                    dayValues='4,5,6,7'
                    hourValues='12,15,20'
                    minuteValues='0,15,30,45'
                    ></IonDatetime></IonItem>
                </IonList>
                </IonCard>
            </IonContent>
        </IonPage >
    );
};

export default Asesoria;
