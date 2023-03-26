import {
    IonContent, IonButton, IonInput,
    IonNav, IonNavLink, IonHeader, IonToolbar, IonButtons,
    IonBackButton, IonTitle, IonDatetime, IonDatetimeButton, IonModal,
    useIonAlert, IonToggle
} from "@ionic/react";

import "./UserInterface.scss";

const UserInterface = () => {

    const [presentAlert] = useIonAlert();

    return (
        <IonNav root={() =>
            <IonContent>
                <div className="user-interface">
                    <h4>Button</h4>
                    <IonButton>
                        Button
                    </IonButton>
                    <h4>Text Input</h4>
                    <IonInput placeholder="Placeholder" />
                    <h4>Mobile Push- / Pop-Navigation</h4>
                    <IonNavLink routerDirection="forward" component={() =>
                        <>
                            <IonHeader>
                                <IonToolbar>
                                    <IonButtons slot="start">
                                        <IonBackButton></IonBackButton>
                                    </IonButtons>
                                    <IonTitle>
                                        Page Two
                                    </IonTitle>
                                </IonToolbar>
                            </IonHeader>
                            <IonContent class="ion-padding">
                            </IonContent>
                        </>
                    }>
                        <IonButton>
                            Navigate
                        </IonButton>
                    </IonNavLink>
                    <h4>Date- / Time-Picker</h4>
                    <IonDatetimeButton className="datetime" datetime="datetime"></IonDatetimeButton>
                    <IonModal keepContentsMounted={true}>
                        <IonDatetime id="datetime"></IonDatetime>
                    </IonModal>
                    <h4>Alert</h4>
                    <IonButton
                        onClick={() =>
                            presentAlert({
                                header: 'Alert',
                                message: 'This is an alert',
                                buttons: ['OK']
                            })
                        }
                    >
                        Trigger Alert
                    </IonButton>
                    <h4>Toggle</h4>
                    <IonToggle></IonToggle>
                </div>
            </IonContent>
        }></IonNav>
    )
}

export default UserInterface;