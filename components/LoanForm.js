import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LoanForm = ({ onSubmit, customers }) => {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [frequency, setFrequency] = useState('');
  const [type, setType] = useState('interest');

  useEffect(() => {
    if (customers.length > 0) {
      setCustomerId(customers.id);
    }
  }, [customers]);

  const handleSubmit = () => {
    onSubmit({ customerId, amount, interestRate, frequency, type });
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={customerId}
        onValueChange={setCustomerId}
      >
        <Picker.Item label="Select a customer" value="" />
        {customers.map(customer => (
          <Picker.Item key={customer.id} label={customer.name} value={customer.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Interest Rate"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Frequency"
        value={frequency}
        onChangeText={setFrequency}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={type}
        onValueChange={setType}
      >
        <Picker.Item label="Interest Only" value="interest" />
        <Picker.Item label="Fixed" value="fixed" />
      </Picker>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoanForm;
