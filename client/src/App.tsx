import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendar, person, home, journal, alertCircle } from "ionicons/icons";

import Cursos from "./pages/Cursos";
import Recursos from "./pages/Recursos";
import Perfil from "./pages/Perfil";
import Inicio from "./pages/Inicio";
import Cuenta from "./pages/Cuenta";
import Registro from "./pages/Registro";
import Foro from "./pages/Foro";
import Asesoria from "./pages/Asesoria";
import Editar from "./pages/Editar";
import Calendario from "./pages/Calendario";
import Notif from "./pages/Notif";
import Notificaciones from "./pages/Notificaciones";

import SocketContainer from "./components/SocketContainer";

import ForoPost from './pages/ForoPost';
import ForoNuevo from './pages/ForoNuevo';
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, ProtectedLogin } from "./ProtectedRoute";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App = () => (
	<IonApp>
		<AuthProvider><SocketContainer>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path="/Cursos">
							<ProtectedRoute>
								<Cursos />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Recursos">
							<ProtectedRoute>
								<Recursos />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Inicio">
							<ProtectedRoute>
								<Inicio />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Perfil">
							<ProtectedRoute>
								<Perfil />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Foro">
							<ProtectedRoute>
								<Foro />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Calendario">
							<ProtectedRoute>
								<Calendario />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Asesoria">
							<ProtectedRoute>
								<Asesoria />
							</ProtectedRoute>
						</Route>
						<Route exact path="/ForoNuevo">
							<ForoNuevo />
						</Route>
						<Route exact path="/ForoNuevo">
							<ForoNuevo />
						</Route>
						<Route path="/ForoPost/:postId" component={ForoPost}>
							<ForoPost />
						</Route>
						<Route exact path="/Editar">
							<ProtectedRoute>
								<Editar />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Notif">
							<ProtectedRoute>
								<Notif />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Notificaciones">
							<ProtectedRoute>
								<Notificaciones />
							</ProtectedRoute>
						</Route>
					</IonRouterOutlet>
					<IonTabBar slot="bottom">
						<IonTabButton tab="Inicio" href="/Inicio">
							<IonIcon aria-hidden="true" icon={home} />
							<IonLabel>Menu</IonLabel>
						</IonTabButton>
						<IonTabButton tab="Cursos" href="/Cursos">
							<IonIcon aria-hidden="true" icon={journal} />
							<IonLabel>Cursos</IonLabel>
						</IonTabButton>
						<IonTabButton tab="Calendario" href="/Calendario">
							<IonIcon aria-hidden="true" icon={calendar} />
							<IonLabel>Asesoria</IonLabel>
						</IonTabButton>
						<IonTabButton tab="Perfil" href="/Perfil">
							<IonIcon aria-hidden="true" icon={person} />
							<IonLabel>Perfil</IonLabel>
						</IonTabButton>
						<IonTabButton tab="Notificaciones" href="/Notificaciones">
							<IonIcon aria-hidden="true" icon={person} />
							<IonLabel>Notificaciones</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
				{/* Aquí se movio Cuenta a fuera de IonTabs para que al estar en esta pagina no se pueda acceder al menú */}
				<Route exact path="/Registro">
					<ProtectedLogin>
						<Registro />
					</ProtectedLogin>
				</Route>
				<Route exact path="/Cuenta">
					<ProtectedLogin>
						<Cuenta />
					</ProtectedLogin>
				</Route>
			</IonReactRouter></SocketContainer>
		</AuthProvider>
	</IonApp>
	
);

export default App;
