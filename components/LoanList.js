import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LoanList = ({ loan, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('LoanDetail', { loan })}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Cantidad: {loan.amount}</Text>
        <Text style={styles.headerText}>Tasa de Interés: {loan.interestRate}%</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailText}>Frecuencia: {loan.frequency}</Text>
        <Text style={styles.detailText}>Tipo: {loan.type === 'interest' ? 'Interés Solo' : 'Fijo'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 16,
    color: '#666666',
  },
});

export default LoanList;
