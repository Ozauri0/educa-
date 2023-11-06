import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import React from "react";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonInput,
	IonButton,
	IonRouterLink,
} from "@ionic/react";
import "./Inicio.css";
import { User } from "../types";

interface FormData {
	correo: string;
	contrasena: string;
}

const Cuenta: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const { signin } = useAuth();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const user: User = {
			correo: data.correo, // Usar el correo del formulario
			contrasena: data.contrasena, // Usar la contraseña del formulario
		};
		signin(user);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Educa +</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Educa +</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Iniciar Sesión</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<p>
								Para iniciar sesión en Educa +, debes ingresar tu correo
								institucional y tu contraseña.
							</p>
							<p>
								Si no tienes una cuenta, puedes crear una en el siguiente
								enlace:
							</p>
							<IonRouterLink routerLink="/registro">Registrarse</IonRouterLink>{" "}
							{/* Enlace al formulario de registro */}
							<IonInput
								type="email"
								placeholder="Ingrese su correo"
								{...register("correo", {
									required: true,
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Correo inválido",
									},
								})}
							/>
							<p className="register-error">{errors.correo?.message}</p>
							<IonInput
								type="password"
								placeholder="Ingrese su contraseña"
								{...register("contrasena", {
									required: {
										value: true,
										message: "Contraseña requerida",
									},
									minLength: {
										value: 6,
										message: "Mínimo 6 caracteres",
									},
								})}
							/>
							<p className="register-error">{errors.contrasena?.message}</p>
							<IonButton type="submit" expand="full">
								Iniciar Sesión
							</IonButton>
							<IonButton expand="full" routerLink="/Registro">
								Registrarse
							</IonButton>
						</form>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Cuenta;
