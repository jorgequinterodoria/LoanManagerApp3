import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { LoanContext } from '../context/LoanContext';
import PaymentForm from '../components/PaymentForm';

const LoanDetailScreen = ({ route, navigation }) => {
  const { loan } = route.params;
  const { payLoan } = useContext(LoanContext);

  const handlePayment = payment => {
    payLoan(loan.id, payment);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loan Details</Text>
      <Text style={styles.text}>Customer: {loan.customer.name}</Text>
      <Text style={styles.text}>Amount: {loan.amount}</Text>
      <Text style={styles.text}>Interest Rate: {loan.interestRate}%</Text>
      <Text style={styles.text}>Frequency: {loan.frequency}</Text>
      <Text style={styles.text}>Type: {loan.type}</Text>
      <PaymentForm onSubmit={handlePayment} />
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

export default LoanDetailScreen;
