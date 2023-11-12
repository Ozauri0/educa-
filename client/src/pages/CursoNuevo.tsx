import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import {
	IonCardTitle,
	IonCard,
	IonCardHeader,
	IonCardContent,
	IonInput,
	IonLabel,
	IonPage,
	IonButton,
} from '@ionic/react';
import './CursoNuevo.css'
import { Curso } from '../types';
import { registerCurso } from '../api/auth';

export default function CursoNuevo() {

	const { register, handleSubmit, formState: { errors } } = useForm<Curso>();
	const onSubmit: SubmitHandler<Curso> = async (data) => {
		registerCurso(data)
	}

	return (
		<IonPage>
			<IonCard>
				<IonCardHeader>
					<IonCardTitle>Crear Curso</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<IonLabel class='text-white'>Nombre del curso:</IonLabel>
						<IonInput class='text-white'{...register("nombre_curso", { required: true })} placeholder="Nombre curso" />
						<IonLabel class='text-white'>Descripción del curso:</IonLabel>
						<IonInput class='text-white'{...register("descripcion", { required: true })} placeholder="Descripcion curso" />
						<IonLabel class='text-white'>Número de cupos:</IonLabel>
						<IonInput type='number' class='text-white'{...register("limite_cupos", { required: true })} placeholder="Numero cupos" />
						<IonLabel class='text-white'>Fecha de inicio:</IonLabel>
						<IonInput type='date' class='text-white'{...register("fecha_inicio", { required: true })} placeholder="Fecha inicio" />
						<IonLabel class='text-white'>Fecha de término:</IonLabel>
						<IonInput type='date' class='text-white'{...register("fecha_termino", { required: true })} placeholder="Fecha termino" />
						<IonButton type='submit'>Crear curso</IonButton>
					</form>
				</IonCardContent>
			</IonCard>
		</IonPage>
	);
}


