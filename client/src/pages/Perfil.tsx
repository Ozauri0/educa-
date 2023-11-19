import React from "react";
import {
	IonContent,
	IonIcon,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonAvatar,
	IonItem,
	IonLabel,
	IonGrid,
	IonCard,
	IonBadge,
	IonButton,
	IonButtons,
	IonCardTitle,
	IonCardHeader,
} from "@ionic/react";
import { menu } from "ionicons/icons";
import "./Perfil.css";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Perfil: React.FC = () => {
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	console.log(currentUser);

	const handleLogout = async () => {
		logout();
		history.push("/Cuenta");
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Perfil</IonTitle>
					<IonButtons slot="end">
						<IonButton href="/Editar">
							<IonIcon slot="icon-only" icon={menu} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonItem>
					<IonAvatar slot="start">
						<img
							alt="Educa +"
							src="https://ionicframework.com/docs/img/demos/avatar.svg"
						/>
					</IonAvatar>
					<IonLabel>
						{!currentUser ? (
							<>
								<h2>Nombre</h2>
								<h3>Apellido</h3>
								<p>Correo</p>
							</>
						) : (
							<>
								<h2>{currentUser.nombres}</h2>
								<h3>{currentUser.apellidos}</h3>
								<p>{currentUser.correo}</p>
								<p>Otra info:</p>
								<p>RUT: {currentUser.rut}</p>
								<p>Teléfono: {currentUser.telefono}</p>
							</>
						)}
					</IonLabel>
					<IonLabel slot="end">
						<IonButton color="primary" expand="block" onClick={handleLogout}>
							Cerrar sesion
						</IonButton>
					</IonLabel>
				</IonItem>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Ayudantias</IonCardTitle>
					</IonCardHeader>
					<IonGrid>
						<IonItem>
							<IonBadge color="primary" slot="end">
								3
							</IonBadge>
							<IonLabel>Ayudantias pendientes</IonLabel>
						</IonItem>
						<IonItem>
							<IonBadge color="warning" slot="end">
								1
							</IonBadge>
							<IonLabel>Ayudantias Perdidas</IonLabel>
						</IonItem>
						<IonButton color="primary" expand="block" href="/Recursos">
							Ver Ayudantias
						</IonButton>
					</IonGrid>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Perfil;
