import React, { useState, ReactElement } from "react";
import { Container, Button, TextInput } from "../../components/primitives";
import { Firebase, db } from "../../services/Firebase";

import { View, StyleSheet, Text } from "react-native";

import { LOGIN, FIRESTORE_USERS_DOCUMENT_NAME } from "../../constants";

export function Register({ navigation }): ReactElement {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleSignUp = async () => {
    if (name && email) {
      try {
        const res = await Firebase.auth().createUserWithEmailAndPassword(
          email,
          password
        );
        if (res?.user?.uid) {
          const user = {
            uid: res.user.uid,
            email: email,
            name: name,
          };

          db.collection(FIRESTORE_USERS_DOCUMENT_NAME)
            .doc(res.user.uid)
            .set(user);

          setIsRegistered(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogin = () => navigation.navigate(LOGIN);

  return (
    <Container>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={styles.formContainer}>
        <TextInput
          value={name}
          onChangeText={(name) => setName(name)}
          placeholder="Full Name"
        />
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
        {!isRegistered && <Button onPress={handleSignUp}>Signup</Button>}

        {isRegistered && (
          <>
            <Text>Great success! </Text>
            <Button onPress={handleLogin}>Login here</Button>
          </>
        )}
      </View>
    </Container>
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
