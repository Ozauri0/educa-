import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Header.css';
import { title } from 'process';

const Header: React.FC<{ title: string }> = ({ title }) => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <a href="/Inicio" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="Logo" src="https://i.imgur.com/EyZIJxu.png/" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
                <IonTitle className="educa-plus-title">{title}</IonTitle>
              </div>
            </a>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    );
  };
  
export default Header;