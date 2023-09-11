/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { IonPage, IonCard, IonCardContent, IonInput, IonLabel, IonButton } from '@ionic/react';
import { registerRequest } from '../api/auth';
import './Registro.css';

type Inputs = {
	nombres: string
	apellidos: string
  correo: string
	telefono: string
  contrasena: string
}

const Registro: React.FC = () => {
	const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data)
		registerRequest(data)
	}

	console.log(watch("nombres"))
	console.log(watch("apellidos"))
	console.log(watch("correo"))
	console.log(watch("telefono"))
	console.log(watch("contrasena"))

  return (
		<IonPage>
			<IonCard>
				<IonCardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<IonLabel>Nombre</IonLabel>
						<IonInput type='text' placeholder='Ingrese su nombre' {...register("nombres", { required: true })}/>
						<IonLabel>Apellido</IonLabel>
						<IonInput type='text' placeholder='Ingrese su apellido' {...register("apellidos", { required: true })}/>
						<IonLabel>Correo</IonLabel>
						<IonInput type='email' placeholder='Ingrese su correo' {...register("correo", { required: true })}/>
						<IonLabel>Telefono</IonLabel>
						<IonInput type='text' placeholder='Ingrese su teléfono'{...register("telefono", { required: true })}/>
						<IonLabel>Contraseña</IonLabel>
						<IonInput type='password' placeholder='Ingrese su contraseña'{...register("contrasena", { required: true })}/>
						<IonButton type='submit'>Enviar</IonButton>
					</form>
				</IonCardContent>
			</IonCard>
		</IonPage>
  );
};

export default Registro;
