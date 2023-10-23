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
	IonButton,
	IonInput,
	IonLabel,
} from "@ionic/react";
import "./Inicio.css";
import { User } from "../types";

interface FormData {
	correo: string;
	contrasena: string;
}

const Login: React.FC = () => {
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
					<IonTitle>Login</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Iniciar Sesión</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<IonLabel>Correo</IonLabel>
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
							<IonLabel>Contraseña</IonLabel>
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
							<IonButton type="submit">Enviar</IonButton>
						</form>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default Login;
