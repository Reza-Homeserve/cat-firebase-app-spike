import React, { useState, ReactElement } from "react";
import { Firebase } from "../../services/Firebase";
import { TextInput, Container, Button } from "../../components/primitives";
import { View, StyleSheet, Text } from "react-native";

export function ForgottenPassword({ navigation }): ReactElement {
  const [email, setEmail] = useState<string>("");
  const [hasSentRequest, setSentRequest] = useState<boolean>(false);

  const handleRequest = () => {
    if (email) {
      Firebase.auth()
        .sendPasswordResetEmail(email)
        .then(() => setSentRequest(true))
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container>
      <Text style={styles.pageTitle}>Forgotten password</Text>
      <View style={styles.formContainer}>
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          autoCapitalize="none"
        />
        <Button onPress={handleRequest}>Change password</Button>
        {hasSentRequest && <Text>Done! Check your email.</Text>}
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
