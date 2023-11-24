import React from 'react';
import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Header.css';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <a href="/Inicio" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img alt="Logo" src="https://i.imgur.com/bwPtm5M.png" style={{ maxWidth: '40px', height: 'auto', marginLeft: '10px', marginRight: '-3px' }} />
              <IonTitle className="educa-plus-title">{title}</IonTitle>
            </div>
          </a>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default Header;