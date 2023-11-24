<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { lazy } from 'react';
import { useParams } from 'react-router';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonAvatar,
    IonIcon,
    IonItem,
    IonCardTitle,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonPage,
    IonInput,
    IonText,
    IonList,
    IonLabel,
    IonThumbnail,
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import SocketContainer from '../components/SocketContainer';
import { useHistory } from 'react-router-dom';
import { set } from 'react-hook-form';


function Horarios() {
    const { currentUser } = useAuth();
	const history = useHistory();
	const [horarios, setHorarios] = useState([]);

    const getHorarios = () => {
    fetch("http://localhost:4000/api/horario/" + currentUser?.id)
			.then((response) => response.json())
			.then((data) => {
                setHorarios(data);
			});
	}

	useEffect(() => {
		getHorarios();
	}
		, []);
    
    return (
        <SocketContainer> 
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
						{horarios.map((item: any) => (
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
        </SocketContainer>
    );
}
=======
import React, { useEffect, useState } from 'react';
import { lazy } from 'react';
import { useParams } from 'react-router';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonAvatar,
    IonIcon,
    IonItem,
    IonCardTitle,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonPage,
    IonInput,
    IonText,
    IonList,
    IonLabel,
    IonThumbnail,
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
//import SocketContainer from '../components/SocketContainer';
import { useHistory } from 'react-router-dom';


function Horarios() {
    const { currentUser } = useAuth();
    const history = useHistory();
    const [horarios, setHorarios] = useState([]);

    const getHorarios = () => {
    fetch("http://localhost:4000/api/horario/" + currentUser?.id)
            .then((response) => response.json())
            .then((data) => {
                setHorarios(data);
            });
    }

    useEffect(() => {
        getHorarios();
    }
        , []);
    
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
                        {horarios.map((item: any) => (
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
>>>>>>> Main
export default Horarios;