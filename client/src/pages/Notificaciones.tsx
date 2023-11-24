<<<<<<< HEAD
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
import { useAuth } from '../context/AuthContext';

import './Notificaciones.css';

function Foro() {

  const [notificacion, setNotificaciones] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetch('http://localhost:4000/api/Notificaciones/'+currentUser?.id)
      .then(response => response.json())
      .then(data => 
        setNotificaciones(data));

  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notificaciones</IonTitle>
          <IonButton routerDirection='forward' slot="end" href="/ForoNuevo">
            <IonIcon slot="icon-only" icon={add} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonList inset={true}>
          {notificacion.map((item: any) => (
            <IonItem key={item.id} href={'/ForoPost/' + item.id_post}>
              <IonLabel>
				<div className="unread-indicator-wrapper" slot='start'></div>
                <h2>{item.notificacion}</h2>
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
=======
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Notificaciones.css";
import { useAuth } from "../context/AuthContext";
import { Notificacion } from "../types";
import { getNotifRequest } from "../api/auth";
import { IonContent, IonItem, IonPage } from "@ionic/react";

const NotificacionesComponent: React.FC = () => {
	const { currentUser } = useAuth();
	const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

	useEffect(() => {
		async function getNotifications() {
			if (currentUser) {
				try {
					const response = await getNotifRequest({
						id: currentUser.id,
					}); // Llama a la función con el correo del usuario actual
					const data = response.data;
					setNotificaciones(data); // Actualiza el estado con los datos recibidos
				} catch (error) {
					console.error(error);
				}
			}
		}
		getNotifications();
	}, [currentUser]);

	return (
		<IonPage>
			<IonContent fullscreen>
				{notificaciones.map((notificacion: Notificacion) => (
					<IonItem key={notificacion.id}>
						<div>
							<p>De: {notificacion.de_autor}</p>

							<p>Fecha: {notificacion.fecha}</p>
							<p>{notificacion.accion}</p>
							<p>{notificacion.mensaje}</p>
						</div>
					</IonItem>
				))}
			</IonContent>
		</IonPage>
	);
};
export default NotificacionesComponent;
>>>>>>> Main
