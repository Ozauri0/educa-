import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendar, person, home, journal } from "ionicons/icons";

import Cursos from "./pages/Cursos";
import Recursos from "./pages/Recursos";
import Perfil from "./pages/Perfil";
import Inicio from "./pages/Inicio";
import Cuenta from "./pages/Cuenta";
import Registro from "./pages/Registro";
import Foro from "./pages/Foro";
import Calendario from "./pages/Calendario";
import Chatbotbutton from "./pages/ChatbotButton";
import Header from "./pages/Header";
import Admin from "./pages/Admin";
import Eliminar from "./pages/Eliminar";
import ForoPost from './pages/ForoPost';
import ForoNuevo from './pages/ForoNuevo';
import Notif from "./pages/Notif";
import Notificaciones from "./pages/Notificaciones";
import AgregarCurso from "./pages/AgregarCurso";
import EliminarCurso from "./pages/EliminarCurso";
import CursoData from "./pages/CursoData";
import Horarios from "./pages/Horarios";
import CursoInfo from "./pages/CursoInfo";
import Error from "./pages/Error";

import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, ProtectedLogin } from "./ProtectedRoute";
//import SocketComponent from './components/SocketComponent';

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
		<AuthProvider>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route path="/Cursos">
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
						<Route path="/ForoPost/:postId" component={ForoPost}>
							<ProtectedRoute>
								<ForoPost />
							</ProtectedRoute>
						</Route>
						<Route exact path="/ForoNuevo">
							<ForoNuevo />
						</Route>
						<Route exact path="/Calendario">
							<ProtectedRoute>
								<Calendario />
							</ProtectedRoute>
						</Route>
						<Route exact path="/ChatbotButton">
							<ProtectedRoute>
								<Chatbotbutton />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Admin">
							<ProtectedRoute>
								<Admin />
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
						<Route exact path="/Eliminar">
							<ProtectedRoute>
								<Eliminar />
							</ProtectedRoute>
						</Route>
						<Route exact path="/AgregarCurso">
							<ProtectedRoute>
								<AgregarCurso />
							</ProtectedRoute>
						</Route>
						<Route exact path="/EliminarCurso">
							<ProtectedRoute>
								<EliminarCurso />
							</ProtectedRoute>
						</Route>
						<Route exact path="/CursoData">
							<ProtectedRoute>
								<CursoData />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Horarios">
							<ProtectedRoute>
								<Horarios />
							</ProtectedRoute>
						</Route>
						<Route exact path="/Curso/:id" render={() =>
							<ProtectedRoute>
								<CursoData />
							</ProtectedRoute>} />
						<Route exact path="/Curso/View/:id" render={() =>
							<ProtectedRoute>
								<CursoInfo />
							</ProtectedRoute>
						} />
						<Route exact path="/Header">
							<Header title={""} />
						</Route>
						<Route component={Error} />
					</IonRouterOutlet>
					<IonTabBar slot="bottom">
						<IonTabButton tab="Inicio" href="/Inicio">
							<IonIcon className="iconcolor" aria-hidden="true" icon={home} />
							<IonLabel>Menu</IonLabel>
						</IonTabButton>
						<IonTabButton tab="Cursos" href="/Cursos">
							<IonIcon className="iconcolor" aria-hidden="true" icon={journal} />
							<IonLabel>Cursos</IonLabel>
						</IonTabButton>
						<IonTabButton tab="Calendario" href="/Calendario">
							<IonIcon className="iconcolor" aria-hidden="true" icon={calendar} />
							<IonLabel>Asesoria</IonLabel>
						</IonTabButton>
						<IonTabButton tab="Perfil" href="/Perfil">
							<IonIcon className="iconcolor" aria-hidden="true" icon={person} />
							<IonLabel>Perfil</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
				{/* Aquí se movio Cuenta a fuera de IonTabs para que al estar en esta pagina no se pueda acceder al menú */}
				<Route exact path="/Registro">
					<Registro />
				</Route>
				<Route exact path="/">
					<ProtectedLogin>
						<Cuenta />
					</ProtectedLogin>
				</Route>
				<Route>
					<div>
						<h1>ERROR XD</h1>
					</div>
				</Route>
			</IonReactRouter>
		</AuthProvider>
	</IonApp>
);

export default App;
