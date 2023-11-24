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
<<<<<<< HEAD
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
    
=======
    IonBadge,
} from '@ionic/react';
import { chevronBack, notificationsSharp } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import {getNotifRequest} from '../api/auth';
import './ForoPost.css';
import { arrayOutputType } from 'zod';

import {socket} from '../service/socket';

function ForoPost() {
    const postId = useParams<{ postId: string }>().postId;
    const { currentUser } = useAuth();
    const [datosForo, setDatosForo] = useState<any>([]);
    const [datosComentario, setDatosComentario] = useState([]);
    const [comentario, setNuevoComentario] = useState('');
    const [loading, setLoading] = useState(true);
    const [numNotif, setNumNotif] = useState(0);

>>>>>>> Main
    const handleNuevoComentario = async () => {
        fetch('http://localhost:4000/api/ncomentario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
<<<<<<< HEAD
                nombre_usuario: currentUser?.correo,
                comentario: comentario,
                id_post: postId,
=======
                id_usuario: currentUser?.id,
                nombre_usuario: currentUser?.correo,
                comentario: comentario,
                id_post: postId,
                id_autor: datosForo[0].id_autor,
>>>>>>> Main
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
<<<<<<< HEAD
                    postNotification();
                    window.location.reload();
                }
            })
    }
    const postNotification = async () => {
        fetch('http://localhost:4000/api/nnotificacion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_usuario: currentUser?.id,
                notificacion: 'Nuevo comentario en el foro',
                visto: false,
                id_post: postId,
            })
        })
            .then(response => response.json())
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
=======
                    socket.emit('new-comment', "hola");
                }
            })
    }
    useEffect(() => {
        fetch('http://localhost:4000/api/foropost/' + postId)
            .then(response => response.json())
            .then(data =>
                setDatosForo(data));
    }, []);

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:4000/api/comentarios/' + postId)
                .then(response => response.json())
                .then(data =>
                    setDatosComentario(data));
            setLoading(false);
        }
            , 500);
    }
        , []);

    useEffect(() => {
        async function getNotifications() {
            if (currentUser) {
                try {
                    const response = await getNotifRequest({
                        id: currentUser.id,
                    });
                    const data = response.data;
                    setNumNotif(data.length); // Actualiza el estado con los datos recibidos
                } catch (error) {
                    console.error(error);
                }
            }
        }
        getNotifications();
    }, [currentUser]);

    useEffect(() => {
        async function handleNotif() {
            if (currentUser?.id === datosForo.id_autor) {
                try {
                    const response = await getNotifRequest({
                        id: currentUser?.id,
                    });
                    
                    const data = response.data;

                    console.log(data.length);
                    console.log(numNotif);
                    if (data.length > numNotif) {
                        setNumNotif(data.length);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        handleNotif();
    }
        , [currentUser]);

    useEffect(() => {
        socket.on('new-comment', async(data: any) => {
            window.location.reload();
        }
        );
    }
        , []);
    
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                    <a href="/Inicio" style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
                        <IonTitle className="educa-plus-title">Foro numero {postId} </IonTitle>
                        <IonButton href="/Notificaciones">
                            <IonIcon slot="icon-only" icon={notificationsSharp}/>
                            <IonBadge color="danger">{numNotif}</IonBadge>
                        </IonButton>
                        <IonButton href='/Foro'>
                            <IonIcon slot="icon-only" icon={chevronBack} />
                        </IonButton>
                    </div>
                    </a> 
            </IonToolbar> 
>>>>>>> Main
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
<<<<<<< HEAD
=======
                            <IonCardContent>
                                <IonText color="light">{item.autor}</IonText>
                            </IonCardContent>
                            <IonCardContent>
                                <IonText color="light">{item.id_autor}</IonText>
                            </IonCardContent>
>>>>>>> Main
                        </IonCard>
                    </IonItem>
                ))}
                    <IonCard>
                        <IonCardHeader>
<<<<<<< HEAD
                            <IonCardTitle color="light">Comentarios</IonCardTitle>
=======
                            <IonCardTitle color="primary">Comentarios</IonCardTitle>
>>>>>>> Main
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
<<<<<<< HEAD
                            <IonButton expand='block' onClick={() => {emitNotif("chat")}}>Publicar</IonButton>
                        </IonCardContent>
                    </IonCard>
            </IonContent >
        </IonPage >
        </SocketContainer>
=======
                            <IonButton expand='block' onClick={handleNuevoComentario}>Publicar</IonButton>
                        </IonCardContent>
                    </IonCard>

            </IonContent >
        </IonPage >
>>>>>>> Main
    );
}
export default ForoPost;