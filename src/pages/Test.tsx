import { IonButton, IonImg, IonContent, IonCard, IonPage } from '@ionic/react';
import React, { SyntheticEvent, useEffect, useState } from 'react';

const Test: React.FC = () => {
	const [catUrl, setCatUrl] = useState('');

	const getCatImage = async () => {
		try {
			const response = await fetch('https://cataas.com/cat?json=true');
			const data = await response.json();
			const url = `https://cataas.com${data.url}`;
			setCatUrl(url);
			return url
		} catch (error) {
			console.error(error);
			return error
		}
	}

	// useEffect(() => {
	// 	getCatImage();
	// }, [catUrl]);

	return (
		<IonContent fullscreen>
			<IonButton onClick={() => {
				getCatImage();
			}}>Get New Cat</IonButton>
			{catUrl && <img src={catUrl}></img>}
		</IonContent>
	);
}

export default Test;