import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { LoanContext } from '../context/LoanContext';
import LoanList from '../components/LoanList';

const HomeScreen = ({ navigation }) => {
  const { loans } = useContext(LoanContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Préstamos</Text>
      <FlatList
        data={loans}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <LoanList loan={item} navigation={navigation} />}
        style={styles.flatList}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddLoan')}>
          <Text style={styles.buttonText}>Añadir Préstamo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddCustomer')}>
          <Text style={styles.buttonText}>Añadir Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Statistics')}>
          <Text style={styles.buttonText}>Reportes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  flatList: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '48%', // Para que haya dos botones por fila
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
