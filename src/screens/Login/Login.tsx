import React, { useState, useEffect, ReactElement } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button as RNButton,
} from "react-native";
import { Button, TextInput } from "../../components/primitives";
import { OAUTH_CLIENTID } from "../../constants";
import firebase from "firebase";
import { Firebase, db } from "../../services/Firebase";
import * as Google from "expo-google-app-auth";

import { DASHBOARD, REGISTER, FORGOTTON_PASSWORD } from "../../constants";

export function Login({ navigation }): ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        return navigation.navigate(DASHBOARD);
      }
    });

    return () => {};
  }, [loggedIn]);

  const handleEmailPasswordLogin = () => {
    if (email && password) {
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => setLoggedIn(true))
        .catch((error) => console.error(error)); // needs validation
    }
  };

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

    const signinCallback = (result) => {
      const {
        user: { uid, email },
        additionalUserInfo,
      } = result;

      const user = {
        uid: uid,
        email: email,
        name: `${additionalUserInfo.profile.given_name} ${additionalUserInfo.profile.family_name}`,
        last_logged_in: Date.now(),
      };
      db.collection("users").doc(uid).set(user);
    };

    // TODO: Sign in only if they aren't already auth'd via Firebase
    Firebase.auth()
      .signInWithCredential(credential)
      .then(signinCallback)
      .then(() => setLoggedIn(true))
      .catch(({ code, message }) =>
        console.error("this is properly busted", code, message)
      );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button onPress={handleEmailPasswordLogin}>Login</Button>
      <RNButton
        title="Forgotten your password?"
        onPress={() => navigation.navigate(FORGOTTON_PASSWORD)}
      />
      <RNButton
        title="Don't have an account yet? Sign up"
        onPress={() => navigation.navigate(REGISTER)}
      />

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
            Continue with Google
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

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
});
