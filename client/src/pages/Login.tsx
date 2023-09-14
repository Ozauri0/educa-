import { useForm, SubmitHandler } from "react-hook-form";
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
import { loginRequest } from "../api/auth";
type Inputs = {
	correo: string;
	contrasena: string;
};

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		loginRequest(data);
	};

	console.log(watch("correo"));
	console.log(watch("contrasena"));

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Registro</IonTitle>
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
										message: "Correo inválido", // JS only: <p>error message</p> TS only support string
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
										message: "Mínimo 6 caracteres", // JS only: <p>error message</p> TS only support string
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
