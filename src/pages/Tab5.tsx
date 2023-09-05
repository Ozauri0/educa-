import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAvatar, IonItem, IonLabel, IonDatetime, IonGrid, IonCard, IonBadge, IonButton, IonButtons, IonCardTitle, IonCardHeader } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Perfil</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItem>
                    <IonLabel> Ayudantias inscritas</IonLabel>
                </IonItem>
                <IonItem>
                    <IonDatetime
                        placeholder="Select Date"
                        presentation="date"
                        highlightedDates={[
                            {
                                date: '2023-09-07',
                                textColor: '#09721b',
                                backgroundColor: '#c8e5d0',
                            },
                            {
                                date: '2023-09-08',
                                textColor: '#09721b',
                                backgroundColor: '#c8e5d0',
                            },
                            {
                                date: '2023-09-09',
                                textColor: '#09721b',
                                backgroundColor: '#c8e5d0',
                            },
                            
                        ]}
                    ></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel> Ayudantias Perdidas</IonLabel>
                </IonItem>
                <IonItem>
                    <IonDatetime
                        placeholder="Select Date"
                        presentation="date"
                        highlightedDates={[
                            {
                                date: '2023-09-01',
                                textColor: '#09721b',
                                backgroundColor: '#ffff00',
                            },]}
                    ></IonDatetime>
                </IonItem>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Ayudantias</IonCardTitle>
                    </IonCardHeader>
                    <IonGrid>
                        <IonItem>
                            <IonBadge color="primary" slot="end">1</IonBadge>
                            <IonLabel>Ayudantias pendientes</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonBadge color="warning" slot="end">2</IonBadge>
                            <IonLabel>Ayudantias Perdidas</IonLabel>
                        </IonItem>
                        <IonButton color="primary" expand="block" href='/tab4'>Solicitar ayudantia</IonButton>
                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Tab3;