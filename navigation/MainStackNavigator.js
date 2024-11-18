import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import CustomerListScreen from '../screens/CustomerListScreen';
import EditCustomerScreen from '../screens/EditCustomerScreen';
import AddLoanScreen from '../screens/AddLoanScreen';
import LoanListScreen from '../screens/LoanListScreen';
import EditLoanScreen from '../screens/EditLoanScreen';
import LoanDetailScreen from '../screens/LoanDetailScreen';
import PaymentScreen from '../screens/PaymentScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="CustomerList" component={CustomerListScreen} />
        <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
        <Stack.Screen name="EditCustomer" component={EditCustomerScreen} />
        <Stack.Screen name="LoanList" component={LoanListScreen} />
        <Stack.Screen name="AddLoan" component={AddLoanScreen} />
        <Stack.Screen name="EditLoan" component={EditLoanScreen} />
        <Stack.Screen name="LoanDetail" component={LoanDetailScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Statistics" component={StatisticsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
