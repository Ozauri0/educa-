import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
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
	IonAlert,
	IonRouterLink,
} from "@ionic/react";
import { useAuth } from "../context/AuthContext";
import Rut from "rut.js";
import "./Registro.css";

type Inputs = {
	nombres: string;
	apellidos: string;
	rut: string;
	telefono: string;
	correo: string;
	contrasena: string;
	confirmar_contrasena: string;
};

const Registro: React.FC = () => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<Inputs>();

	const { signup } = useAuth();
	const [error, setError] = useState<string>("");
	const [registerSuccess, setRegisterSuccess] = useState<string>("");

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			const response = await signup(data);
			if (response.data.message) {
				setRegisterSuccess(response.data.message);
			}
		} catch (error: any) {
			setError(error.message)
		}
	};

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
							<p>
								Si ya tienes una cuenta, puedes iniciar sesión en el siguiente
								enlace:
							</p>
							<IonRouterLink routerLink="/cuenta">Iniciar Sesión</IonRouterLink>{" "}
							<br></br>
							<br></br>
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
							<IonLabel>Confirmar Contraseña</IonLabel>
							<IonInput
								type="password"
								placeholder="Confirme su contraseña"
								{...register("confirmar_contrasena", {
									required: {
										value: true,
										message: "Contraseña requerida",
									},
									minLength: {
										value: 6,
										message: "Mínimo 6 caracteres", // JS only: <p>error message</p> TS only support string
									},
									validate: {
										equals: (value) =>
											value === getValues("contrasena") ||
											"Las contraseñas no coinciden"
									}
								})}
							/>
							<p className="register-error">{errors.confirmar_contrasena?.message}</p>
							<IonButton className="boton" type="submit">Enviar</IonButton>
						</form>
					</IonCardContent>
				</IonCard>
				<IonAlert
					isOpen={!!error}
					message={error}
					buttons={["Aceptar"]}
					onDidDismiss={() => setError("")} />
				<IonAlert
					isOpen={!!registerSuccess}
					message={registerSuccess}
					buttons={["Aceptar"]}
					onDidDismiss={() => setRegisterSuccess("")}
				/>
			</IonContent>
		</IonPage >
	);
};

export default Registro;
