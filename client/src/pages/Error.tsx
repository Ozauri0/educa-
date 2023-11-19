import { IonContent, IonPage, IonText } from "@ionic/react";
import React from "react";

const Error: React.FC = () => {
	return (
		<IonPage>
			<IonContent>
				<IonText>
					<h1 color="crimson">404 - Página no encontrada</h1>
					<p color="crimson">La página que estás buscando no existe.</p>
				</IonText>
			</IonContent>
		</IonPage>
	);
};

export default Error;
