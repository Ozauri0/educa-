import React, { useEffect, useState } from "react";
import {IonContent,IonIcon,IonHeader,IonPage,IonTitle,IonToolbar,IonAvatar,IonItem,IonLabel,IonGrid,IonCard,IonBadge,IonButton,IonButtons,IonCardTitle,IonCardHeader,IonCardContent,IonList,
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
  fetch("http://192.168.1.167:4000/api/horario/" + currentUser?.id)
    .then((response) => response.json())
    .then((data) => {
      // Obtener el día actual
      const today = new Date().toLocaleDateString("es-CL", { weekday: "long" });
      console.log(today);
      // Filtrar la data para obtener solo los horarios del día actual
      const horariosDelDiaActual = data.filter((horario: any) => horario.dia === today);
      // Guardar la data filtrada en el estado
      setHorarios(horariosDelDiaActual);
    })
    .catch((error) => {
      console.log(error);
    });
};

	useEffect(() => {
		getHorarios();
	}
		, []);

	const handleLogout = () => {
		logout();
		history.push("/");
	};

	return (
		<IonPage>
			<IonHeader>
			<IonToolbar>
            <a href="/Inicio" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
                <IonTitle className="educa-plus-title">Perfil</IonTitle>
              </div>
            </a>
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
					<IonLabel className="textolista">
						{!currentUser ? (
							<>
								<h2>Nombre</h2>
								<h3>Apellido</h3>
								<p>Correo</p>
							</>
						) : (
							<>
								<h2>{currentUser.nombres} {currentUser.apellidos}</h2>
								<p>{currentUser.correo}</p>
								<p>RUT: {currentUser.rut}</p>
								<p>Teléfono: {currentUser.telefono}</p>
							</>
						)}
					</IonLabel>
					<IonLabel slot="end">
						<IonButton href="/" color="danger" expand="block" onClick={handleLogout}>
							Cerrar sesion
						</IonButton>
					</IonLabel>
				</IonItem>
				<IonButton color="danger" expand="block" href="/Admin">Panel de administración </IonButton>
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
					<IonButton className="boton" expand="block" href={'/Horarios'}>
                            Horarios completos
                    </IonButton>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Perfil;
