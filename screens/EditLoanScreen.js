import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import LoanForm from '../components/LoanForm';
import { useContext } from 'react';
import { LoanContext } from '../context/LoanContext';

const EditLoanScreen = ({ route, navigation }) => {
  const { loan } = route.params;
  const { updateLoan, customers } = useContext(LoanContext);

  const [customerId, setCustomerId] = useState(loan.customerId);
  const [amount, setAmount] = useState(loan.amount);
  const [interestRate, setInterestRate] = useState(loan.interestRate);
  const [frequency, setFrequency] = useState(loan.frequency);
  const [type, setType] = useState(loan.type);

  useEffect(() => {
    setCustomerId(loan.customerId);
    setAmount(loan.amount);
    setInterestRate(loan.interestRate);
    setFrequency(loan.frequency);
    setType(loan.type);
  }, [loan]);

  const handleSubmit = () => {
    updateLoan({ id: loan.id, customerId, amount, interestRate, frequency, type });
    navigation.goBack();
  };

  return (
    <View>
      <LoanForm
        onSubmit={handleSubmit}
        initialValues={{ customerId, amount, interestRate, frequency, type }}
        customers={customers}
      />
    </View>
  );
};

export default EditLoanScreen;
