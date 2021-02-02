import firebase from "firebase";
import remoteConfig from "@react-native-firebase/remote-config";

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGE_SENDER_ID,
  APP_ID,
} from "@env";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
};

export let Firebase: any;

if (!firebase.apps.length) {
  Firebase = firebase.initializeApp(firebaseConfig);
} else {
  Firebase = firebase.app(); // if already initialized, use that one
}
export const db = firebase.firestore();

remoteConfig().setConfigSettings({
  minimumFetchIntervalMillis: 0,
});

export const remote = remoteConfig()
  .setDefaults({
    awesome_new_feature: "disabled",
  })
  .then(() => remoteConfig().fetchAndActivate())
  .then((fetchedRemotely) => {
    if (fetchedRemotely) {
      console.log("Configs were retrieved from the backend and activated.");
    } else {
      console.log(
        "No configs were fetched from the backend, and the local configs were already activated"
      );
    }
  })
  .catch((fbError) => console.log("errrrrrrrrrrror", fbError));

export const getFeature = (key: string) => remoteConfig().getValue(key);
