import React from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { chevronForward } from 'ionicons/icons';

import './Foro.css';

function Foro() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido al Foro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonList inset={true}>
          <IonItem button={true} detail={false}>
            <div className="unread-indicator-wrapper" slot="start">
              <div className="unread-indicator"></div>
            </div>
            <IonLabel>
              <strong>Problemas con curso AMB 1147</strong>
              <IonText>tengo problemas con el curso de AMB1147</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                Cuando intento ingresar al curso me sale un error de...
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">06:11</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false}>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Reseña aplicación educa+</strong>
              <IonText>Quiero reseñar mi tiempo en la app</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                llevo varios dias usando la aplicacion de educa y...
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">03:44</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false}>
            <div className="unread-indicator-wrapper" slot="start">
              <div className="unread-indicator"></div>
            </div>
            <IonLabel>
              <strong>Como puedo solicitar ayuda?</strong>
              <IonText>Ayudantias</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                El otro dia intente pedir una ayudantia pero...
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">Ayer</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
          <IonItem button={true} detail={false}>
            <div className="unread-indicator-wrapper" slot="start"></div>
            <IonLabel>
              <strong>Quiero agendar mas ayduantias!</strong>
              <IonText>Me gustaría saber como</IonText>
              <br />
              <IonNote color="medium" className="ion-text-wrap">
                Llevo varios dias usando la aplicación y quiero ver si...
              </IonNote>
            </IonLabel>
            <div className="metadata-end-wrapper" slot="end">
              <IonNote color="medium">Ayer</IonNote>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>
        </IonList>
      </IonContent>
    </>
  );
}
export default Foro;