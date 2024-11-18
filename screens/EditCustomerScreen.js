import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CustomerForm from '../components/CustomerForm';
import { useContext } from 'react';
import { LoanContext } from '../context/LoanContext';

const EditCustomerScreen = ({ route, navigation }) => {
  const { customer } = route.params;
  const { updateCustomer } = useContext(LoanContext);

  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);

  useEffect(() => {
    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
  }, [customer]);

  const handleSubmit = () => {
    updateCustomer({ id: customer.id, name, email, phone });
    navigation.goBack();
  };

  return (
    <View>
      <CustomerForm
        onSubmit={handleSubmit}
        initialValues={{ name, email, phone }}
      />
    </View>
  );
};

export default EditCustomerScreen;
