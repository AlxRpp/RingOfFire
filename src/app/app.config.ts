import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ringoffire-37737","appId":"1:912636157058:web:ce31062675f16f2a02a89b","storageBucket":"ringoffire-37737.firebasestorage.app","apiKey":"AIzaSyDvPXEe6THRgC2lgwxEpm31jFvVLZecchA","authDomain":"ringoffire-37737.firebaseapp.com","messagingSenderId":"912636157058"})), provideFirestore(() => getFirestore())]
};
