import { getDatabase } from './index.js';

export const getLoans = async () => {
  const db = getDatabase();
  return await db.getAllAsync('SELECT * FROM loans');
};

export const getLoanById = async (id) => {
  const db = getDatabase();
  return await db.getFirstAsync('SELECT * FROM loans WHERE id = ?', id);
};

export const addLoan = async (loan) => {
  const db = getDatabase();
  const result = await db.runAsync(
    `INSERT INTO loans (
      customerId, amount, interestRate, frequency, type,
      startDate, remainingAmount, remainingInstallments
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      loan.customerId,
      loan.amount,
      loan.interestRate,
      loan.frequency,
      loan.type,
      loan.startDate,
      loan.amount,
      loan.remainingInstallments,
    ]
  );
  return result.lastInsertRowId;
};

export const updateLoan = async (loan) => {
  const db = getDatabase();
  await db.runAsync(
    `UPDATE loans SET
      customerId = ?, amount = ?, interestRate = ?,
      frequency = ?, type = ?, startDate = ?,
      remainingAmount = ?, remainingInstallments = ?
    WHERE id = ?`,
    [
      loan.customerId,
      loan.amount,
      loan.interestRate,
      loan.frequency,
      loan.type,
      loan.startDate,
      loan.remainingAmount,
      loan.remainingInstallments,
      loan.id,
    ]
  );
};

export const deleteLoan = async (loanId) => {
  const db = getDatabase();
  await db.runAsync('DELETE FROM loans WHERE id = ?', loanId);
};
