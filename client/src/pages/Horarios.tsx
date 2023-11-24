import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonPage,
    IonList,
    IonLabel,
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
//import SocketContainer from '../components/SocketContainer';
import { useHistory } from 'react-router-dom';
import { getHorarios } from '../api/api';


function Horarios() {
    const { currentUser } = useAuth();
    const history = useHistory();
    const [horarios, setHorarios] = useState([]);

    const fetchHorarios = async () => {
        try {
            const response = await getHorarios(currentUser!.id!);
            setHorarios(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchHorarios();
    }, []);

    return (
        //<SocketContainer> 
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Horarios</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton href='/Perfil'>
                            <IonIcon slot="icon-only" icon={chevronBack} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent color="Light">
                <IonList>
                    {!!horarios && horarios.map((item: any) => (
                        <IonItem key={item.id}>
                            <IonLabel>
                                <h2>{item.dia}</h2>
                                <h3>{item.hora}</h3>
                                <p>{item.curso}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent >
        </IonPage >
        //</SocketContainer>
    );
}
export default Horarios;