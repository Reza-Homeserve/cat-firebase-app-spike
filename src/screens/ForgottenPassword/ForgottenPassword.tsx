import React, { useState, ReactElement } from "react";
import { Firebase } from "../../services/Firebase";
import { TextInput, Button } from "../../components/primitives";
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

  const isClickable = email && !hasSentRequest;

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        autoCapitalize="none"
      />
      <Button onPress={handleRequest}>Change password</Button>
      {hasSentRequest && <Text>Done! Check your email.</Text>}
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
