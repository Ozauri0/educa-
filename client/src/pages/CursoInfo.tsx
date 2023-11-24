import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonGrid, IonRow, IonCol, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Curso, Inscripcion } from "../types";
import { getCurso, getInscripciones, registerInscripcion } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const CursoInfo: React.FC = () => {

	const { id } = useParams<{ id: string }>();
	const { currentUser } = useAuth()
	const [cursoData, setCursoData] = useState<Curso>();
	const [cursosInscritos, setCursosInscritos] = useState<number[]>([]);
	const [files, setFiles] = useState<string[]>([]);
	const [error, setError] = useState<string>("");

	const fetchFiles = async () => {
		try {
			const response = await fetch(`http://localhost:4000/api/list-files/curso/${id}`);
			const data = await response.json();
			setFiles(data);
		} catch (error) {
			console.error('Error al obtener la lista de archivos:', error);
		}
	};

	const fetchCurso = async () => {
		try {
			const response = await getCurso(id);
			setCursoData(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	const fetchInscripciones = async () => {
		try {
			const response = await getInscripciones(currentUser?.id);

			if (response.status === 200) {
				const data = await response.data

				// Extraer las ID de los cursos en los que el usuario está inscrito
				const inscripciones = data.map((inscripcion: Inscripcion) => inscripcion.id_curso)
				setCursosInscritos(inscripciones);
			} else {
				// Manejar errores si la respuesta no es exitosa
				console.error('Error al obtener inscripciones:', response.statusText);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleInscripcion = async (id_curso: number) => {

		try {
			const inscripcion: Inscripcion = { id_curso: id_curso, id_docente: currentUser?.id }
			const response = await registerInscripcion(inscripcion);

			if (response.status == 200) {
				// Manejar el éxito de la operación
				console.log('Inscripción exitosa');
				fetchInscripciones();
				fetchCurso();
			} else {
				// Manejar errores
				console.error('Error al realizar la inscripción');
			}
		} catch (error: any) {
			console.error('Error al realizar la inscripción', error);
			setError(error.response.data.error)
		}
	};

	const filteredFiles = files.filter(file => file !== 'banner');

	useEffect(() => {
		fetchInscripciones();
		fetchCurso()
		fetchFiles();
	}, [])

	return (
		<IonPage>
			<IonHeader>
			<IonToolbar>
            <a href="/Inicio" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
                <IonTitle className="educa-plus-title">Curso</IonTitle>
              </div>
            </a>
          </IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Cursos</IonTitle>
					</IonToolbar>
				</IonHeader>
				{cursoData && (
					<IonCard key={cursoData.id}>
						<IonGrid>
							<IonRow>
								<IonCol size="12" size-md="6" offset-md="3">
									<IonImg src={`http://localhost:4000/uploads/cursos/${id}/banner`} />
									<IonCardHeader>
										<IonCardTitle>{cursoData.nombre_curso}</IonCardTitle>
										<IonCardSubtitle color={"primary"}>{cursoData.descripcion}</IonCardSubtitle>
									</IonCardHeader>
									<IonCardContent>
										<p className="boton">Cupos: {cursoData.cupos_restantes} / {cursoData.limite_cupos}</p>
										<p>Inicio: {new Date(cursoData.fecha_inicio).toLocaleDateString()}</p>
										<p>Fin: {new Date(cursoData.fecha_termino).toLocaleDateString()}</p>
									</IonCardContent>
									{cursosInscritos.includes(cursoData.id) ? (
										<IonButton color='danger' expand="block" onClick={() => handleInscripcion(cursoData.id)}>
											Desinscribirse
										</IonButton>
									) : (
										<IonButton expand="block" className="boton" onClick={() => handleInscripcion(cursoData.id)}>
											Inscribirse
										</IonButton>
									)}
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonCard>
				)}
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Recursos</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						{filteredFiles.map((file, index) => (
							<p key={index}>
								<a href={`http://localhost:4000/uploads/cursos/${id}/${file}`} target="_blank" rel="noopener noreferrer">
									{file}
								</a>
							</p>
						))}
					</IonCardContent>
				</IonCard>
				<IonAlert isOpen={!!error} message={error} buttons={[{ text: "Aceptar", handler: () => setError("") }]} />
			</IonContent>
		</IonPage>
	);
}

export default CursoInfo;