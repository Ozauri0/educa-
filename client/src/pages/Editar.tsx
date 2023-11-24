import React from 'react';
import { IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader } from '@ionic/react';
import './Editar.css';

const Editar: React.FC = () => {
    return (
        <IonPage>
            <IonCard>
                <IonCardHeader>
                    <IonToolbar>
                        <IonTitle>Editar perfil</IonTitle>
                    </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                    <IonInput placeholder="Nombre"/* value={nombre} onIonChange={e => setNombre(e.detail.value!)}*/></IonInput>
                    <IonInput placeholder="Apellido" /*value={apellido} onIonChange={e => setApellido(e.detail.value!)}*/></IonInput>
                    <IonInput placeholder="Email" /*value={email} onIonChange={e => setEmail(e.detail.value!)}*/></IonInput>
                    <IonInput type="password" placeholder="Contraseña" /*value={password} onIonChange={e => setPassword(e.detail.value!)}*/></IonInput>
                    <IonButton /*onClick={handleGuardar}*/ size='small'>Guardar cambios</IonButton>
                    <IonButton /*onClick={handleCancelar}*/ href='Perfil' size='small' fill='outline'>Cancelar</IonButton>

                </IonCardContent>
            </IonCard>
        </IonPage>
    );
};
export default Editar;
