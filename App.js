import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import MainStackNavigator from './navigation/MainStackNavigator';
import { LoanProvider } from './context/LoanContext';
import { initDatabaseService } from './services/dbService';
import { View, Text } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initDatabaseService();
        setIsDbInitialized(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };

    init();
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    return () => subscription.remove();
  }, []);

  if (!isDbInitialized) {
    return (
      <View >
        <Text>Initializing database...</Text>
      </View>
    );
  }

  return (
    <LoanProvider>
      <MainStackNavigator />
    </LoanProvider>
  );
};

export default App;
