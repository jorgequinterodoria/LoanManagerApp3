import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { LoanContext } from '../context/LoanContext';

const LoanListScreen = ({ navigation }) => {
  const { loans, deleteLoan } = useContext(LoanContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loans</Text>
      <FlatList
        data={loans}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.loan}>
            <Text style={styles.text}>Customer: {item.customer.name}</Text>
            <Text style={styles.text}>Amount: {item.amount}</Text>
            <Text style={styles.text}>Interest Rate: {item.interestRate}%</Text>
            <Text style={styles.text}>Frequency: {item.frequency}</Text>
            <Text style={styles.text}>Type: {item.type}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('EditLoan', { loan: item })} />
            <Button
              title="Delete"
              onPress={() => deleteLoan(item.id)}
            />
          </View>
        )}
      />
      <Button title="Add Loan" onPress={() => navigation.navigate('AddLoan')} />
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
  loan: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default LoanListScreen;
