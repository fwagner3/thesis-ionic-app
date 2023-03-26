import { IonButton, IonInput, IonContent } from "@ionic/react";
import React, { useRef, useState, useEffect } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Geolocation } from "@capacitor/geolocation";
import { Preferences } from "@capacitor/preferences";
import { Share } from "@capacitor/share";

import "./NativeFeatures.scss";

const NativeFeatures = () => {

    const [latitude, setLatitude] = useState(0.0);
    const [longitude, setLongitude] = useState(0.0);

    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    const [preferences, setPreferences] = useState<string[][]>([]);

    useEffect(() => {
        getStoredData();
    }, [])

    // Open the dialog to select an image from the gallery and set it in the UI
    const selectPhoto = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
        });

        let imageUrl = image.webPath;

        ref.current!.src = imageUrl!;
    }

    // Get the physical location of the device
    const getPosition = async () => {
        const pos = await Geolocation.getCurrentPosition();

        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
    }

    const ref = useRef<HTMLImageElement | null>(null);

    // Get all stored key-value pairs and put them into state to display them
    const getStoredData = async () => {
        const keyResult = await Preferences.keys();

        const keys = keyResult.keys;

        console.log(keys);

        let pairs: string[][] = [];

        for (let i = 0; i < keys.length; i++) {
            const valueResult = await Preferences.get({ key: keys[i] });
            const value = valueResult.value;

            pairs.push([keys[i], value!]);
        }

        setPreferences(pairs);
    }

    // Store the current values of the text fields as new key-value pair
    const storeData = async () => {
        await Preferences.set({
            key: key,
            value: value
        });

        setKey("");
        setValue("");

        getStoredData();
    }

    // Open the Share Dialog of the OS
    const share = async () => {
        await Share.share({
            title: 'Share API Test',
            text: 'This is the share text'
        })
    }

    return (
        <IonContent>
            <div className="native-features">
                <h4>Gallery Image Picker</h4>
                <IonButton
                    onClick={() => selectPhoto()}
                >
                    Gallery Image Picker
                </IonButton>
                <div style={{ height: '16px' }} />
                <img
                    ref={ref}
                    style={{
                        width: '200px',
                        height: '200px',
                        background: 'black'
                    }}
                />
                <h4>Geolocation</h4>
                <IonButton
                    onClick={() => getPosition()}
                >
                    Get Location
                </IonButton>
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
                <div style={{ height: '8px' }}/>
                <h4>Preferences</h4>
                <IonInput
                    value={key}
                    placeholder="Enter a key"
                    onInput={event => setKey((event.target as HTMLInputElement).value)}
                ></IonInput>
                <IonInput
                    value={value}
                    placeholder="Enter a value"
                    onInput={event => setValue((event.target as HTMLInputElement).value)}
                ></IonInput>
                <IonButton
                    onClick={() => storeData()}
                >
                    Store
                </IonButton>
                <>
                    {preferences.map(pref => (
                        <p key={pref[0]}>{pref[0]}: {pref[1]}</p>
                    ))}
                </>
                <div style={{ height: '8px' }}/>
                <h4>Share API</h4>
                <IonButton
                    onClick={() => share()}
                >
                    Share API
                </IonButton>
            </div>
        </IonContent>
    )
}

export default NativeFeatures;