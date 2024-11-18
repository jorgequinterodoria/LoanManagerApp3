import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SettingForm = ({ onSubmit, settings }) => {
  const [interestRates, setInterestRates] = useState(settings.interestRates.join(','));
  const [paymentPeriods, setPaymentPeriods] = useState(settings.paymentPeriods.join(','));

  const handleSubmit = () => {
    onSubmit({
      interestRates: interestRates.split(',').map(rate => parseFloat(rate.trim())),
      paymentPeriods: paymentPeriods.split(',').map(period => parseInt(period.trim(), 10)),
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Interest Rates (comma separated)"
        value={interestRates}
        onChangeText={setInterestRates}
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Periods (comma separated)"
        value={paymentPeriods}
        onChangeText={setPaymentPeriods}
        keyboardType="numeric"
      />
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

export default SettingForm;
