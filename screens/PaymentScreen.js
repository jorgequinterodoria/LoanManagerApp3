import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PaymentScreen = ({ route, navigation }) => {
  const { loan } = route.params;

  const handlePayment = () => {
    // Aquí se manejaría el pago del préstamo
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay Loan</Text>
      <Text style={styles.text}>Customer: {loan.customer.name}</Text>
      <Text style={styles.text}>Amount: {loan.amount}</Text>
      <Text style={styles.text}>Interest Rate: {loan.interestRate}%</Text>
      <Text style={styles.text}>Frequency: {loan.frequency}</Text>
      <Text style={styles.text}>Type: {loan.type}</Text>
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default PaymentScreen;
