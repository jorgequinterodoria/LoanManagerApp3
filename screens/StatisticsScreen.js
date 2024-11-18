import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { LoanContext } from '../context/LoanContext';
import { Bar } from 'react-chartjs-2';

const StatisticsScreen = () => {
  const { loans } = useContext(LoanContext);

  const totalAmount = loans.reduce((acc, loan) => acc + loan.amount, 0);
  const totalPayments = loans.reduce((acc, loan) => acc + loan.payments.reduce((acc2, payment) => acc2 + payment.amount, 0), 0);

  const data = {
    labels: ['Total Amount', 'Total Payments'],
    datasets: [
      {
        label: 'Amounts',
        data: [totalAmount, totalPayments],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <Bar data={data} options={options} />
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
});

export default StatisticsScreen;
