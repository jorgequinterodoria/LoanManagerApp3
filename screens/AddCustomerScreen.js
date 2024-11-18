import React from 'react';
import { View } from 'react-native';
import CustomerForm from '../components/CustomerForm';
import { useContext } from 'react';
import { LoanContext } from '../context/LoanContext';

const AddCustomerScreen = ({ navigation }) => {
  const { addCustomer } = useContext(LoanContext);

  const handleSubmit = customer => {
    addCustomer(customer);
    navigation.goBack();
  };

  return (
    <View>
      <CustomerForm onSubmit={handleSubmit} />
    </View>
  );
};

export default AddCustomerScreen;
