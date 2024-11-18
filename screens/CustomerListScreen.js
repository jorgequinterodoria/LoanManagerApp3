import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { LoanContext } from '../context/LoanContext';

const CustomerListScreen = ({ navigation }) => {
  const { customers, deleteCustomer } = useContext(LoanContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customers</Text>
      <FlatList
        data={customers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.customer}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.email}</Text>
            <Text style={styles.text}>{item.phone}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('EditCustomer', { customer: item })} />
            <Button
              title="Delete"
              onPress={() => deleteCustomer(item.id)}
            />
          </View>
        )}
      />
      <Button title="Add Customer" onPress={() => navigation.navigate('AddCustomer')} />
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
  customer: {
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

export default CustomerListScreen;
