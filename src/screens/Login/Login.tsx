import React, { useState, useEffect, ReactElement } from "react";
import { Text, View, StyleSheet, Button as RNButton } from "react-native";
import { Button, TextInput, Container } from "../../components/primitives";
import { GoogleSignInButton } from "../../components/molecules";
import { Firebase, db } from "../../services/Firebase";

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

  return (
    <>
      <Container>
        <Text style={styles.pageTitle}>Sign in</Text>
        <View style={styles.formContainer}>
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
          <Button onPress={handleEmailPasswordLogin}>Sign in</Button>
          <RNButton
            title="Forgotten your password?"
            onPress={() => navigation.navigate(FORGOTTON_PASSWORD)}
          />
          <RNButton
            title="Don't have an account yet? Sign up"
            onPress={() => navigation.navigate(REGISTER)}
          />
          <GoogleSignInButton signInHandler={setLoggedIn} />
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
  },
  formContainer: {
    flex: 4,
    alignItems: "center",
  },
});
