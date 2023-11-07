import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonCardTitle,
  IonTitle,
  IonButtons,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from '@ionic/react';
import { chevronBack} from 'ionicons/icons';


import './ForoPost.css';

function ForoPost() {
    const postId = useParams<{ postId: string }>().postId;
    const [datosForo, setDatosForo] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/api/foropost/' + postId)
            .then(response => response.json())
            .then(data => 
            setDatosForo(data));
        }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Foro</IonTitle>
          <IonButtons slot='end'>
            <IonButton href='/Foro'>
              <IonIcon slot="icon-only" icon={chevronBack} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {datosForo.map((item: any) => (
            <IonItem key={item.id}>
              <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{item.titulo}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>{item.descripcion}</p>
                </IonCardContent>
                </IonCard>
            </IonItem>
        ))}
      </IonContent>
    </>
  );
}
export default ForoPost;