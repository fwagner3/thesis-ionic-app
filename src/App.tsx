import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Performance from "./pages/Performance";
import UserInterface from "./pages/UserInterface";
import NativeFeatures from "./pages/NativeFeatures";

import { speedometer, brush, apps } from 'ionicons/icons';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/performance"/>
          <Route path="/performance" render={() => <Performance/>} exact={true}/>
          <Route path="/userinterface" render={() => <UserInterface/>} exact={true}/>
          <Route path="/nativefeatures" render={() => <NativeFeatures/>} exact={true}/>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="performance" href="/performance">
            <IonIcon icon={speedometer}/>
            <IonLabel>Performance</IonLabel>
          </IonTabButton>
          <IonTabButton tab="userinterface" href="/userinterface">
            <IonIcon icon={brush}/>
            <IonLabel>User Interface</IonLabel>
          </IonTabButton>
          <IonTabButton tab="nativefeatures" href="/nativefeatures">
            <IonIcon icon={apps}/>
            <IonLabel>Native Features</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
