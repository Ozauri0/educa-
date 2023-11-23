import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import { add } from 'ionicons/icons';

import './Foro.css';

function Foro() {

  const [datosForo, setDatosForo] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/foro')
      .then(response => response.json())
      .then(data => 
        setDatosForo(data.slice(0, 10)));

  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido al Foro</IonTitle>
          <IonButton slot="end" href="/ForoNuevo">
            <IonIcon slot="icon-only" icon={add} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonList inset={true}>
          {datosForo.map((item: any) => (
            <IonItem key={item.id} href={'/ForoPost/' + item.id}>
              <IonLabel>
                <h2>{item.titulo}</h2>
                <p>{item.descripcion}</p>
                <IonNote>{item.fecha}</IonNote>
              </IonLabel>
              <IonButton fill="clear">
                <IonIcon slot="end" icon={chevronForward} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
export default Foro;