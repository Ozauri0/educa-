import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import {
	IonPage,
	IonCard,
	IonCardContent,
	IonInput,
	IonLabel,
	IonButton,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonContent,
	IonCardHeader,
	IonCardTitle,
} from "@ionic/react";
import { registerRequest } from "../api/auth";
import Rut from "rut.js";
import "./Registro.css";

type Inputs = {
	nombres: string;
	apellidos: string;
	rut: string;
	telefono: string;
	correo: string;
	contrasena: string;
};

const Registro: React.FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		registerRequest(data);
	};

	console.log(watch("nombres"));

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
						<IonCardTitle>Registro</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<IonLabel>Nombre</IonLabel>
							<IonInput
								type="text"
								placeholder="Ingrese su nombre"
								{...register("nombres", {
									required: { value: true, message: "Nombre requerido" },
								})}
							/>
							<p className="register-error">{errors.nombres?.message}</p>
							<IonLabel>Apellido</IonLabel>
							<IonInput
								type="text"
								placeholder="Ingrese su apellido"
								{...register("apellidos", {
									required: {
										value: true,
										message: "Apellido requerido",
									},
								})}
							/>
							<p className="register-error">{errors.apellidos?.message}</p>
							<IonLabel>RUT</IonLabel>
							<IonInput
								type="text"
								placeholder="Ingrese su RUT"
								{...register("rut", {
									required: {
										value: true,
										message: "RUT requerido",
									},
									validate: (value) => Rut.validate(value) || "RUT inválido",
								})}
							/>
							<p className="register-error">{errors.rut?.message}</p>
							<IonLabel>Telefono</IonLabel>
							<IonInput
								type="text"
								placeholder="Ingrese su teléfono"
								{...register("telefono", {
									required: {
										value: true,
										message: "Telefono requerido",
									},
								})}
							/>
							<p className="register-error">{errors.telefono?.message}</p>
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

export default Registro;
