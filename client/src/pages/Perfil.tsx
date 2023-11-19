import React, { useEffect, useState } from "react";
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
	IonCardContent,
	IonList,
} from "@ionic/react";
import { menu } from "ionicons/icons";
import "./Perfil.css";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { get } from "http";

const Perfil: React.FC = () => {
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	const [horarios, setHorarios] = useState([]);

	const getHorarios = () => {
		fetch("http://localhost:4000/api/horario/" + currentUser?.id)
			.then((response) => response.json())
			.then((data) => {
				// Obtener el día actual

				const today = new Date().toLocaleDateString("es-CL", { weekday: "long" });

				console.log(today);

				// Filtrar la data para obtener solo los horarios del día actual
				const horariosDelDiaActual = data.filter((horario: any) => horario.dia === today);
				// Guardar la data filtrada en el estado
				setHorarios(horariosDelDiaActual);
			});
	}

	useEffect(() => {
		getHorarios();
	}
		, []);

	const handleLogout = () => {
		logout();
		history.push("/login");
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
						<IonCardTitle>Horarios</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
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
					<IonButton color="primary" expand="block" href={'/Horarios/' + currentUser?.id}>
							Horarios completos
					</IonButton>

					</IonCardContent>
				</IonCard>
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
