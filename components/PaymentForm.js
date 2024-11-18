import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const PaymentForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    onSubmit({ amount, note });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Note"
        value={note}
        onChangeText={setNote}
        multiline
      />
      <Button title="Pay" onPress={handleSubmit} />
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

export default PaymentForm;
