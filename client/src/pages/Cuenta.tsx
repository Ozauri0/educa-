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
	IonAlert,
} from "@ionic/react";
import "./Inicio.css";
import { User } from "../types";

type FormData = {
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
	const [error, setError] = React.useState<string>("");

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const user: User = {
			correo: data.correo, // Usar el correo del formulario
			contrasena: data.contrasena, // Usar la contraseña del formulario
		};
		try {
			await signin(user);
		} catch (error: any) {
			setError(error.message)
		}
	};

	return (
		<IonPage>
			<IonHeader>
			<IonToolbar>
            <a href="/Inicio" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
                <IonTitle className="educa-plus-title">Iniciar sesion</IonTitle>
              </div>
            </a>
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
							<IonButton className="boton" type="submit" expand="full">
								Iniciar Sesión
							</IonButton>
						</form>
					</IonCardContent>
				</IonCard>
				<IonAlert isOpen={!!error} message={error} buttons={[{ text: "Aceptar", handler: () => setError("") }]} />
			</IonContent>
		</IonPage>
	);
};

export default Cuenta;