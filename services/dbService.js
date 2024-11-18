import {
    initDatabase,
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getLoans,
    addLoan,
    updateLoan,
    deleteLoan,
    makePayment,
    getSettings,
    updateSettings
  } from '../db/api';

  // Initialize function that can be called when the app starts
  export const initDatabaseService = async () => {
    await initDatabase();
  };

  export {
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getLoans,
    addLoan,
    updateLoan,
    deleteLoan,
    makePayment,
    getSettings,
    updateSettings
  };
