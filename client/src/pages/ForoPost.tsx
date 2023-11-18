import React, { useEffect, useState } from 'react';
import { lazy } from 'react';
import { useParams } from 'react-router';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonAvatar,
    IonIcon,
    IonItem,
    IonCardTitle,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonPage,
    IonInput,
    IonText,
    IonList,
    IonLabel,
    IonThumbnail,
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import { socket } from '../service/socket';
import SocketContainer from '../components/SocketContainer';
import { ToastContainer, toast } from 'react-toastify';

import {getForo,
        getForoCom
        } 
from '../api/auth';


import './ForoPost.css';

function ForoPost() {
    const postId = useParams<{ postId: string }>().postId;
    const [datosForo, setDatosForo] = useState([]);
    const [datosComentario, setDatosComentario] = useState([]);

    const [comentario, setNuevoComentario] = useState('');

    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const notify = (msg : string, msg2 : string, msg3 : string) => {
        toast.success(currentUser?.nombres + ' ' + currentUser?.apellidos + ' te envio un mensaje: ' + msg3, {position: toast.POSITION.TOP_CENTER});
    };

    const emitNotif = (tipo : string) => {
        if (tipo === "chat") {
        socket.emit('chat message', currentUser?.correo, "Te envio un mensaje:", message);
        }
        if (tipo === "foro") {
        socket.emit('foro message', currentUser?.correo, "Te envio un mensaje:", message);
        }
        setMessage('');
    };

    useEffect(() => {
        socket.on("chat message", (msg1, msg2, msg3) => {
        setMessages([...messages, msg3]);
        });
    }, [messages]);
    
    useEffect(() => {
        socket.on('notificacion', (msg1, msg2, msg3) => {
        notify(msg1, msg2, msg3);
        });
    }, []);
    
    const handleNuevoComentario = async () => {
        fetch('http://localhost:4000/api/ncomentario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre_usuario: currentUser?.correo,
                comentario: comentario,
                id_post: postId,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    window.location.reload();
                }
            })
    }

    useEffect(() => {
        async function getForoF() {
			if (currentUser) {
				try {
					const response = await getForo({
						correo: currentUser.correo,
					}); // Llama a la función con el correo del usuario actual
					const data = response.data;
					setMessages(data); // Actualiza el estado con los datos recibidos
				} catch (error) {
					console.error(error);
				}
			}
		}
		getForoF();
    }, [currentUser]);

    useEffect(() => {
        async function getForoComF() {
			if (currentUser) {
				try {
					const response = await getForoCom({
						correo: currentUser.correo,
					}); // Llama a la función con el correo del usuario actual
					const data = response.data;
					setMessages(data); // Actualiza el estado con los datos recibidos
				} catch (error) {
					console.error(error);
				}
			}
		}
		getForoComF();
    }, [currentUser]);

    return (
        <SocketContainer> 
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Foro</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton href='/Foro'>
                            <IonIcon slot="icon-only" icon={chevronBack} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent color="Light">
                {datosForo.map((item: any) => (
                    <IonItem key={item.id}>
                        <IonCard>
                            <img src="https://econtinua.uct.cl/wp-content/uploads/2023/09/dimensiones-personalizadas-720x500-px-99.jpeg" alt="foro" />
                            <IonCardHeader>
                                <IonCardTitle color="light">{item.titulo}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonText color="light">{item.descripcion}</IonText>
                            </IonCardContent>
                        </IonCard>
                    </IonItem>
                ))}
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle color="light">Comentarios</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList>
                                {loading ? (
                                    <IonLabel color="light">Cargando...</IonLabel>
                                ) : (
                                    datosComentario.map((item: any) => (
                                        <IonItem key={item.id}>
                                            <IonAvatar slot="start">
                                                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                            </IonAvatar>
                                            <IonLabel>
                                                <h2>{item.nombre_usuario}</h2>
                                                <p>{item.comentario}</p>
                                            </IonLabel>
                                        </IonItem>
                                    ))
                                )}
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Nuevo Comentario</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem>
                                <IonInput placeholder="Escribe tu comentario" onIonChange={e => setNuevoComentario(e.detail.value!)}></IonInput>
                            </IonItem>
                            <IonButton expand='block' onClick={() => {emitNotif("chat")}}>Publicar</IonButton>
                        </IonCardContent>
                    </IonCard>
            </IonContent >
        </IonPage >
        </SocketContainer>
    );
}
export default ForoPost;