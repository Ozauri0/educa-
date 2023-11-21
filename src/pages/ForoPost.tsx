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

import './ForoPost.css';

function ForoPost() {
    const postId = useParams<{ postId: string }>().postId;
    const { currentUser } = useAuth();
    const [datosForo, setDatosForo] = useState([]);
    const [datosComentario, setDatosComentario] = useState([]);
    const [comentario, setNuevoComentario] = useState('');
    const [loading, setLoading] = useState(true);

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
            , 300);
    }
        , []);

    return (
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
                    <IonItem color={'#14253d'} className='foro' key={item.id}>
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
                            <IonList className='comentario'>
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
                            <IonItem className='nuevocom'>
                                <IonInput placeholder="Escribe tu comentario" onIonChange={e => setNuevoComentario(e.detail.value!)}></IonInput>
                            </IonItem>
                            <IonButton expand='block' onClick={handleNuevoComentario}>Publicar</IonButton>
                        </IonCardContent>
                    </IonCard>
            </IonContent >
        </IonPage >
    );
}
export default ForoPost;