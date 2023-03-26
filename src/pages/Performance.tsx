import React, { useRef, useState, useEffect } from 'react';
import { IonContent, IonButton, IonToolbar, IonTitle, IonHeader, IonNavLink, IonNav, IonButtons, IonBackButton, IonList, IonLabel, IonItem, IonImg } from "@ionic/react";

import "./Performance.scss";

const Performance = () => {
    const frameCounter: FramerateMeasure = new FramerateMeasure();

    const [framerate, setFramerate] = useState<number[]>([]);

    const imgs = Array.from(Array(30).keys());

    useEffect(() => {
        // Measure the FPS five times after the start of the application and set them to display them
        const startFPSMeasure = async () => {
            const resultSet = [];

            for (let i = 0; i < 5; i++) {
                let result = await frameCounter.start();
                resultSet.push(result);
            }

            setFramerate(resultSet);
        }
        startFPSMeasure();
    }, [])

    return (
        <>
            <IonContent>
                <div className='performance-body'>
                    <p className='framerate-text'>Framerate: {framerate.join()}</p>
                    <div className="img-wrapper" style={{
                        backgroundImage: 'url("assets/test.jpeg")'
                    }}>
                        {imgs.map((img, index) => <IonImg key={index} src="assets/test.jpeg" className='img'/>)}
                    </div>
                </div>
            </IonContent>
        </>
    )
}

// Counts the rendered frames until stopped, after a fixed time and then calculates the FPS by dividing them by the time
class FramerateMeasure {
    _isRunning = false;
    _frameCounter: number = 0;
    _animationFrameId: number = 0;

    _loop = () => {
        this._frameCounter += 1;
        this._animationFrameId = requestAnimationFrame(this._loop);
    }

    start = async () => {
        this._isRunning = true;
        this._frameCounter = 0;
        this._animationFrameId = requestAnimationFrame(this._loop);

        await new Promise(resolve => setTimeout(resolve, 10000));
        
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
        }

        this._isRunning = false;

        return (this._frameCounter / 10);
    }
}

export default Performance;