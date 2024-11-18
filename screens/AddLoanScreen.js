import React from 'react';
import { View } from 'react-native';
import LoanForm from '../components/LoanForm';
import { useContext } from 'react';
import { LoanContext } from '../context/LoanContext';

const AddLoanScreen = ({ navigation }) => {
  const { addLoan, customers } = useContext(LoanContext);

  const handleSubmit = loan => {
    addLoan(loan);
    navigation.goBack();
  };

  return (
    <View>
      <LoanForm onSubmit={handleSubmit} customers={customers} />
    </View>
  );
};

export default AddLoanScreen;
