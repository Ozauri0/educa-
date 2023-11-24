import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonModal, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/react';


import './Cursos.css';

const Cursos2: React.FC = () => {

  const modal = React.useRef<HTMLIonModalElement>(null);
  const modal2 = React.useRef<HTMLIonModalElement>(null);
  const modal3 = React.useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
    modal2.current?.dismiss();
    modal3.current?.dismiss();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Educa +</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cursos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <img alt="Curso 1" src="https://prensa.uct.cl/wp-content/uploads/2014/10/csangre.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>Estudiantes UC Temuco ingreso 2020</IonCardSubtitle>
            <IonCardTitle>Perfil Tecnologico 2020</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton id='modal1' expand='block'>Ver Recurso</IonButton>
            <IonModal ref={modal} trigger='modal1'>
              <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="100%"
                height="100%"
                src="http://localhost:4000/uploads/cursos/6/Formulario_de_Posesion_Efectiva-2.pdf"></iframe>
              <IonButton onClick={() => dismiss()} >Cerrar</IonButton>
            </IonModal>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <img alt="Curso 2" src="https://econtinua.uct.cl/wp-content/uploads/2022/09/dimensiones-personalizadas-720x500-px-6-3.jpeg" />
          <IonCardHeader>
            <IonCardSubtitle>Perfil docente UC Temuco</IonCardSubtitle>
            <IonCardTitle>Perfil Docente 2022</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton id='modal2' expand='block'>Ver Recurso</IonButton>
            <IonModal ref={modal2} trigger='modal2'>
              <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="100%"
                height="100%"
                src="https://dte.uct.cl/wp-content/uploads/2022/12/Perfil-docente-2022.pdf"></iframe>
              <IonButton onClick={() => dismiss()} >Cerrar</IonButton>
            </IonModal>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <img alt="Curso 3" src="https://impulso06.com/wp-content/uploads/2022/11/Las-Tic-en-Educacion.png" />
          <IonCardHeader>
            <IonCardSubtitle>Informe de resultados</IonCardSubtitle>
            <IonCardTitle>Practicas con TIC</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton id='modal3' expand='block'>Ver Recurso</IonButton>
            <IonModal ref={modal3} trigger='modal3'>
              <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="100%"
                height="100%"
                src="https://dte.uct.cl/wp-content/uploads/2018/08/Practicas-con-TIC.pdf"></iframe>
              <IonButton onClick={() => dismiss()} >Cerrar</IonButton>
            </IonModal>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Cursos2;
