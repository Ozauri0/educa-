<<<<<<< HEAD
import React, { useState } from "react";
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
	IonText,
} from "@ionic/react";
import "./Registro.css";
import Rut from "rut.js";
{
	/* Importar la librería para validar RUT, "npm install rut.js"*/
}

const Registro: React.FC = () => {
	const [nombre, setNombre] = useState<string>("");
	const [apellido, setApellido] = useState<string>("");
	const [rut, setRut] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [telefono, setTelefono] = useState<string>("");
	const [rutValido, setRutValido] = useState<boolean>(true);
	const [emailValido, setEmailValido] = useState<boolean>(true);
	const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

	const handleRegistro = async () => {
		// Verificar si las contraseñas coinciden y que no estén vacías
		if (password === confirmPassword && password !== "") {
			// Verificar si el RUT es válido
			if (Rut.validate(rut)) {
				// Verificar si el correo es válido
				const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
				if (emailRegex.test(email)) {
					// Todas las condiciones son verdaderas, enviar la información al servidor
					const res = await fetch("http://localhost:4000/api/register", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							nombres: nombre,
							apellidos: apellido,
							rut: rut,
							correo: email,
							contrasena: password,
							telefono: telefono,
						}),
					});
					const data = await res.json();
					console.log(data);
					setPasswordMatch(true); // Restablecer la coincidencia de contraseñas
				} else {
					setEmailValido(false); // Marcar el correo como inválido
				}
			} else {
				setRutValido(false); // Marcar el RUT como inválido
			}
		} else {
			setPasswordMatch(false);
		}
	};

	const validarRut = (inputRut: string) => {
		if (Rut.validate(inputRut)) {
			setRutValido(true);
		} else {
			setRutValido(false);
		}
	};

	const validarEmail = (inputEmail: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		if (emailRegex.test(inputEmail)) {
			setEmailValido(true);
		} else {
			setEmailValido(false);
=======
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
>>>>>>> Main
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
<<<<<<< HEAD
						<IonInput
							value={nombre}
							placeholder="Nombre"
							onIonChange={(e) => setNombre(e.detail.value!)}
						></IonInput>
						<IonInput
							value={apellido}
							placeholder="Apellido"
							onIonChange={(e) => setApellido(e.detail.value!)}
						></IonInput>
						<IonInput
							value={rut}
							placeholder="RUT"
							onIonChange={(e) => {
								setRut(e.detail.value!);
								validarRut(e.detail.value!);
							}}
							className={rutValido ? "" : "invalid"}
						></IonInput>
						{!rutValido && <IonText color="danger">RUT inválido</IonText>}
						<IonInput
							value={email}
							placeholder="Correo Electrónico"
							onIonChange={(e) => {
								setEmail(e.detail.value!);
								validarEmail(e.detail.value!);
							}}
							className={emailValido ? "" : "invalid"}
						></IonInput>
						{!emailValido && (
							<IonText color="danger">Correo electrónico inválido</IonText>
						)}
						<IonInput
							type="password"
							value={password}
							placeholder="Contraseña"
							onIonChange={(e) => setPassword(e.detail.value!)}
						></IonInput>
						<IonInput
							type="password"
							value={confirmPassword}
							placeholder="Confirmar Contraseña"
							onIonChange={(e) => setConfirmPassword(e.detail.value!)}
							className={passwordMatch ? "" : "invalid"}
						></IonInput>
						{!passwordMatch && (
							<IonText color="danger">Las contraseñas no coinciden</IonText>
						)}
						<IonInput
							value={telefono}
							placeholder="Telefono"
							onIonChange={(e) => setTelefono(e.detail.value!)}
						></IonInput>
						<IonButton expand="full" onClick={handleRegistro}>
							Registrarse
						</IonButton>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
=======
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
>>>>>>> Main
	);
};

export default Registro;
