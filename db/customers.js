import { getDatabase } from './index.js';

export const getCustomers = async () => {
  const db = getDatabase();
  return await db.getAllAsync('SELECT * FROM customers');
};

export const getCustomerById = async (id) => {
  const db = getDatabase();
  return await db.getFirstAsync('SELECT * FROM customers WHERE id = ?', id);
};

export const addCustomer = async (customer) => {
  const db = getDatabase();
  const result = await db.runAsync(
    'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)',
    [customer.name, customer.email, customer.phone]
  );
  return result.lastInsertRowId;
};

export const updateCustomer = async (customer) => {
  const db = getDatabase();
  await db.runAsync(
    'UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?',
    [customer.name, customer.email, customer.phone, customer.id]
  );
};

export const deleteCustomer = async (customerId) => {
  const db = getDatabase();
  await db.runAsync('DELETE FROM customers WHERE id = ?', customerId);
};
