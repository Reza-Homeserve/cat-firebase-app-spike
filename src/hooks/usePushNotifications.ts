import React, { useState } from "react";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

import { LOGIN, FIRESTORE_USERS_DOCUMENT_NAME } from "../constants";
import { Firebase, db } from "../services/Firebase";

export function usePushNotification() {
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    false
  );

  const getUsersPushToken = async (user) => {
    const token = await db
      .collection(FIRESTORE_USERS_DOCUMENT_NAME)
      .doc(user.uid)
      .get();
    const { push_token: pushToken } = token.data();

    console.log(1, pushToken);

    return pushToken;
  };

  const registerForPushNotificationsAsync = async (user): Promise<void> => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    setNotificationsEnabled(existingStatus === "granted");

    if (!notificationsEnabled) {
      // try alternate approach
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      setNotificationsEnabled(status === "granted");
    }

    if (!notificationsEnabled) {
      // short-circuit
      return;
    }

    try {
      const usersToken = await getUsersPushToken(user);
      if (usersToken) {
        return setPushToken(usersToken);
      }

      if (!usersToken) {
        const { data: token } = await Notifications.getExpoPushTokenAsync();
        db.collection(FIRESTORE_USERS_DOCUMENT_NAME)
          .doc(user.uid)
          .update({ push_token: token })
          .then(() =>
            console.log(`updated the user ${user.uid} with token ${token}`)
          )
          .then(() => setPushToken(token));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [registerForPushNotificationsAsync];
}
