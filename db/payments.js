import { getDatabase } from './index.js';

export const makePayment = async (loanId, payment) => {
  const db = getDatabase();
  await db.execAsync(`
    BEGIN TRANSACTION;

    INSERT INTO payments (loanId, amount, note, date)
    VALUES (?, ?, ?, ?);

    UPDATE loans SET
      remainingAmount = CASE
        WHEN type = 'interest' THEN MAX(0, remainingAmount - ?)
        WHEN type = 'fixed' THEN MAX(0, remainingAmount - (amount / remainingInstallments))
        ELSE remainingAmount
      END,
      remainingInstallments = CASE
        WHEN type = 'interest' AND remainingAmount - ? <= 0 THEN 0
        WHEN type = 'fixed' THEN remainingInstallments - 1
        ELSE remainingInstallments
      END
    WHERE id = ?;

    COMMIT;
  `, [
    loanId, payment.amount, payment.note, payment.date,
    payment.amount, payment.amount, loanId
  ]);
};

export const getPaymentsByLoanId = async (loanId) => {
  const db = getDatabase();
  return await db.getAllAsync(
    'SELECT * FROM payments WHERE loanId = ? ORDER BY date DESC',
    loanId
  );
};
