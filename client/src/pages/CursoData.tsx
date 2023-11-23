import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { getCurso } from '../api/auth';
import { Curso } from '../types';

const CursoData: React.FC = () => {

	const { id } = useParams<{ id: string }>(); // Obtener la ID del URL
	const [cursoData, setCursoData] = useState<Curso>();
	const [bannerUrl, setBannerUrl] = useState<string>("")
	const [files, setFiles] = useState<string[]>([]);
	const [isEditing, setIsEditing] = useState(false);

	const fetchFiles = async () => {
		try {
			const response = await fetch(`http://192.168.1.167:4000/api/list-files/curso/${id}`);
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

		// Usa Axios para enviar una solicitud POST al servidor
		try {
			const response = await fetch(`http://192.168.1.167:4000/api/upload/${ruta}`, {
				method: 'POST',
				body: formData,
			});
			if (response.status === 200) {
				fetchFiles();
			}
			console.log(response);
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

		try {
			const response = await fetch(`http://192.168.1.167:4000/api/upload/banner/${id}`, {
				method: 'POST',
				body: formData,
			});

			if (response.status === 200) {
				const newBannerUrl = `http://192.168.1.167:4000/uploads/cursos/${id}/banner?${Date.now()}`;
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
			const response = await fetch(`http://192.168.1.167:4000/api/delete-file/curso/${id}/${fileName}`, {
				method: 'DELETE',
			});

			if (response.ok) {
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
			const response = await fetch(`http://192.168.1.167:4000/api/curso/${id}`, {
				method: 'PUT', // Asegúrate de que tu backend soporte el método PUT
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedCurso),
			});

			if (response.ok) {
				const data = await response.json();
				setCursoData(data); // Actualiza el estado con los nuevos datos
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
									<IonImg src={bannerUrl || `http://localhost:4000/uploads/cursos/${id}/banner`} /> {/* Usa el estado bannerUrl */}
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
									<a href={`http://192.168.1.167:4000/uploads/cursos/${id}/${file}`} target="_blank" rel="noopener noreferrer">
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