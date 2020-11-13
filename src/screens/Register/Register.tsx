import React, { useState, ReactElement } from "react";
import { Button, TextInput } from "../../components/primitives";
import { Firebase, db } from "../../services/Firebase";

import { View, StyleSheet, Text } from "react-native";

import { LOGIN } from "../../constants";

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

          db.collection("users").doc(res.user.uid).set(user);

          setIsRegistered(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogin = () => navigation.navigate(LOGIN);

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
