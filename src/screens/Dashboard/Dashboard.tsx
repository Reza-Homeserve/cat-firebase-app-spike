import React, { useEffect, useState, ReactElement } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button as RNButton,
  Image,
} from "react-native";
import { Container, Button } from "../../components/primitives";
import { LOGIN, FIRESTORE_USERS_DOCUMENT_NAME } from "../../constants";
import { Firebase, db } from "../../services/Firebase";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { usePushNotification } from "../../hooks/usePushNotifications";

// https://docs.expo.io/versions/latest/sdk/notifications/#setnotificationhandlerhandler-notificationhandler--null-void
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function Dashboard({ navigation }): ReactElement {
  const [registerNotifications] = usePushNotification();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    false
  );
  const [user, setUser] = useState<object | null>(null);
  const [pushToken, setPushToken] = useState<string | null>();

  const handleSignout = () => {
    Firebase.auth().signOut();
    navigation.navigate(LOGIN);
  };

  useEffect(() => {
    let isMounted = true;
    Firebase.auth().onAuthStateChanged((user) => {
      if (user != null && isMounted) {
        setLoggedIn(true);
        setUser(user);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [loggedIn, user]);

  const getPushToken = async (user) => {
    try {
      const token = await db
        .collection(FIRESTORE_USERS_DOCUMENT_NAME)
        .doc(user.uid)
        .get();

      const { push_token } = token.data();

      if (push_token) {
        return setPushToken(push_token);
      }
      registerNotifications(user);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePushNotification = () => {
    if (pushToken) {
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            to: pushToken,
            sound: "default",
            title: "Checkatrade App",
            body: "You've triggered a notification",
          },
        ]),
      })
        .then(() => console.log("it worked?"))
        .catch((err) => console.error("nope"));
    }
  };

  useEffect(() => {
    if (user && !pushToken) {
      registerNotifications(user);
      getPushToken(user);
    }
  }, [user]);

  console.log(pushToken);

  return (
    <Container>
      {loggedIn && user && (
        <>
          <Text style={styles.pageTitle}>Dashboard</Text>
          <View style={styles.formContainer}>
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            <Text>Name: {user.displayName}</Text>
            <Text>Email: {user.email}</Text>
            <Button
              label="Trigger notification"
              onPress={handlePushNotification}
            />
          </View>
          <View style={{ alignItems: "center", flex: 2 }}>
            <RNButton onPress={handleSignout} title="Sign out" />
          </View>
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    resizeMode: "stretch",
    borderRadius: 25,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
  },
  formContainer: {
    flex: 4,
    alignItems: "flex-start",
  },
});
