import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { getCurso, updateCurso } from '../api/cursos';
import { uploadFile, getFiles, deleteFile } from '../api/api';
import { Curso } from '../types';

const CursoData: React.FC = () => {

	const { id } = useParams<{ id: string }>(); // Obtener la ID del URL
	const [cursoData, setCursoData] = useState<Curso>();
	const [bannerUrl, setBannerUrl] = useState<string>("")
	const [files, setFiles] = useState<string[]>([]);
	const [isEditing, setIsEditing] = useState(false);
	const backend = process.env.REACT_APP_BACKEND_URL;

	const fetchFiles = async () => {
		try {
			const response = await getFiles(id);
			setFiles(response.data);
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

	useEffect(() => {
		fetchCurso()
		fetchFiles();
		fetchFiles();
	}, [])

	const handleFileUpload = async (e: any) => {
		const file = e.target.files[0];

		// Crea un objeto FormData
		const formData = new FormData();

		// Agrega el archivo al objeto FormData
		formData.append('file', file);
		const ruta = `cursos/${id}`

		try {
			const response = await uploadFile(ruta, formData)
			if (response.status === 200) {
				fetchFiles()
			}
		} catch (error) {
			console.error('Error al subir el archivo:', error);
		}
	}

	const handleBannerUpload = async (e: any) => {
		const file = e.target.files[0];

		// Crea un objeto FormData
		const formData = new FormData();

		// Agrega el archivo al objeto FormData
		formData.append('file', file);
		const ruta = `banner/${id}`

		try {
			const response = await uploadFile(ruta, formData)
			if (response.status === 200) {
				const newBannerUrl = `${backend}/uploads/cursos/${id}/banner?${Date.now()}`;
				console.log("URL", newBannerUrl);
				setBannerUrl(newBannerUrl); // Actualiza el estado con la nueva URL del banner
			}
			// Maneja la respuesta del servidor
			console.log(response);
		} catch (error) {
			console.error('Error al subir el archivo:', error);
		}
	};

	const handleDeleteResource = async (fileName: string) => {
		try {
			const response = await deleteFile(id, fileName);
			if (response.status === 200) {
				console.log('Recurso eliminado exitosamente');
				fetchFiles(); // Actualizar la lista de archivos después de eliminar
			} else {
				console.error('Error al eliminar el recurso');
			}
		} catch (error) {
			console.error('Error al eliminar el recurso:', error);
		}
	};

	const filteredFiles = files.filter(file => file !== 'banner');

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleFormSubmit = async (event: any) => {
		event.preventDefault();

		const updatedCurso = {
			...cursoData,
			nombre_curso: event.target.nombre_curso.value,
			descripcion: event.target.descripcion.value,
			fecha_inicio: event.target.fecha_inicio.value,
			fecha_termino: event.target.fecha_termino.value,
			limite_cupos: event.target.limite_cupos.value,
		};

		try {
			const response = await updateCurso(id, updatedCurso);
			// body: JSON.stringify(updatedCurso),
			if (response.status === 200) {
				setCursoData(response.data); // Actualiza el estado con los nuevos datos
				setIsEditing(false); // Finaliza la edición
				fetchCurso();
			}
		} catch (error) {
			console.error('Error al actualizar el curso:', error);
		}
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<a href="/Inicio" style={{ textDecoration: 'none' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
							<IonTitle className="educa-plus-title">Editar curso</IonTitle>
						</div>
					</a>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Cursos</IonTitle>
					</IonToolbar>
					<IonToolbar>
						<IonTitle size="large">Cursos</IonTitle>
					</IonToolbar>
				</IonHeader>
				{cursoData && (
					<IonCard key={cursoData.id}>
						<IonGrid>
							<IonRow>
								<IonCol size="12" size-md="6" offset-md="3">
									<IonImg src={bannerUrl || `${backend}/uploads/cursos/${id}/banner`} /> {/* Usa el estado bannerUrl */}
									{isEditing ? (
										<form onSubmit={handleFormSubmit}>
											<IonInput name="nombre_curso" type='text' value={cursoData.nombre_curso} />
											<IonTextarea name="descripcion" rows={5} value={cursoData.descripcion} />
											<IonInput name="fecha_inicio" type="date" value={new Date(cursoData.fecha_inicio).toISOString().slice(0, 10)} />
											<IonInput name="fecha_termino" type='date' value={new Date(cursoData.fecha_termino).toISOString().slice(0, 10)} />
											<IonInput name="limite_cupos" type='number' value={cursoData.limite_cupos} />
											<IonButton color={"danger"} type="submit">Guardar</IonButton>
										</form>
									) : (
										<>
											<IonCardHeader>
												<IonCardTitle>{cursoData.nombre_curso}</IonCardTitle>
											</IonCardHeader>
											<IonCardContent>
												<p>{cursoData.descripcion}</p>
												<p>Inicio: {new Date(cursoData.fecha_inicio).toLocaleDateString()}</p>
												<p>Fin: {new Date(cursoData.fecha_termino).toLocaleDateString()}</p>
												<p>Cupos: {cursoData.cupos_restantes} / {cursoData.limite_cupos}</p>
											</IonCardContent>
											<IonButton className='boton' onClick={handleEdit}>Editar Curso</IonButton>
										</>
									)}
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonCard>
				)}
				<IonCard>
					<IonGrid color='white'>
						<IonRow>
							<IonCol>
								<p>Subir archivo</p>
								<input type='file' onChange={handleFileUpload} />
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<p>Subir banner</p>
								<input type='file' onChange={handleBannerUpload} />
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonCard>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Recursos</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						{filteredFiles.map((file, index) => (
							<div key={index}>
								<p>
									<a href={`${backend}/uploads/cursos/${id}/${file}`} target="_blank" rel="noopener noreferrer">
										{file}
									</a>
								</p>
								<IonButton color={"danger"} onClick={() => handleDeleteResource(file)}>Eliminar</IonButton>
							</div>
						))}
					</IonCardContent>

				</IonCard>

			</IonContent>
		</IonPage>
	);
}

export default CursoData;