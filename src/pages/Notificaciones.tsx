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
						correo: currentUser.correo,
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
							<h1>Para: {notificacion.usuario}</h1>
              <p>De: {notificacion.de}</p><p>Fecha: {notificacion.fecha}</p>
							<p> {notificacion.accion} {notificacion.mensaje}</p>
						</div>
					</IonItem>
				))}
			</IonContent>
		</IonPage>
	);
};
export default NotificacionesComponent;