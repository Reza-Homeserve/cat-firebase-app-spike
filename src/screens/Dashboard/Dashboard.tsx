import React, { useEffect, useState, ReactElement } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { LOGIN } from "../../constants";
import { Firebase, db } from "../../services/Firebase";

export function Dashboard({ navigation }): ReactElement {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<object | null>(null);

  const handleSignout = () => {
    Firebase.auth().signOut();
    navigation.navigate(LOGIN);
  };

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.info("We're in!", user);

        setLoggedIn(true);
        setUser(user);
      }
    });
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      {loggedIn && user && (
        <>
          <Text>Dashboard Screen</Text>
          <Text>Name: {user.providerData[0].displayName}</Text>
          <Text>Email: {user.providerData[0].email}</Text>
          <Button onPress={handleSignout} title="sign out" />
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
