import React, { Dispatch, SetStateAction, ReactElement } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as Google from "expo-google-app-auth";
import { SvgXml } from "react-native-svg";
import {
  OAUTH_CLIENTID,
  FIRESTORE_USERS_DOCUMENT_NAME,
} from "../../../constants";
import firebase from "firebase";
import { Firebase, db } from "../../../services/Firebase";

type Props = {
  signInHandler: Dispatch<SetStateAction<boolean>>;
};

export function GoogleSignInButton({ signInHandler }: Props): ReactElement {
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // androidClientId: OAUTH_CLIENTID,
        iosClientId: OAUTH_CLIENTID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  const onSignIn = async (googleUser) => {
    const credential = firebase.auth.GoogleAuthProvider.credential(
      googleUser.idToken,
      googleUser.accessToken
    );

    // const signinCallback = (result) => {
    //   const {
    //     user: { uid, email },
    //     additionalUserInfo,
    //   } = result;

    //   const user = {
    //     uid: uid,
    //     email: email,
    //     name: `${additionalUserInfo.profile.given_name} ${additionalUserInfo.profile.family_name}`,
    //     last_logged_in: Date.now(),
    //   };
    //   db.collection(FIRESTORE_USERS_DOCUMENT_NAME).doc(uid).set(user);
    // };

    // TODO: Sign in only if they aren't already auth'd via Firebase
    Firebase.auth()
      .signInWithCredential(credential)
      //.then(signinCallback)
      .then(() => signInHandler(true))
      .catch(({ code, message }) =>
        console.error("this is properly busted", code, message)
      );
  };

  const GoogleIcon = () => (
    <SvgXml
      style={styles.googleIcon}
      xml={`<svg viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                fill="#4285f4"
              />
              <path
                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                fill="#34a853"
              />
              <path
                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                fill="#fbbc04"
              />
              <path
                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                fill="#ea4335"
              />
            </svg>`}
      width="15"
      height="15"
    />
  );

  return (
    <TouchableOpacity
      style={{ width: "86%", marginTop: 10 }}
      onPress={signInWithGoogleAsync}
    >
      <View style={styles.googleButton}>
        <Text
          style={{
            letterSpacing: 0.5,
            fontSize: 16,
            color: "#707070",
          }}
        >
          <GoogleIcon />
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: "#FFFFFF",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#707070",
  },

  googleIcon: {
    position: "relative",
    top: 5,
    marginRight: 10,
  },
});
