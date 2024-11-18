import * as SQLite from 'expo-sqlite';

let db = null;

export const initDatabase = async () => {
  if (db) return db;

  db = await SQLite.openDatabaseAsync('loanmanager.db');

  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerId INTEGER NOT NULL,
      amount REAL NOT NULL,
      interestRate REAL NOT NULL,
      frequency INTEGER NOT NULL,
      type TEXT NOT NULL,
      startDate TEXT NOT NULL,
      remainingAmount REAL NOT NULL,
      remainingInstallments INTEGER NOT NULL,
      FOREIGN KEY (customerId) REFERENCES customers (id)
    );

    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      loanId INTEGER NOT NULL,
      amount REAL NOT NULL,
      note TEXT,
      date TEXT NOT NULL,
      FOREIGN KEY (loanId) REFERENCES loans (id)
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      interestRates TEXT NOT NULL,
      paymentPeriods TEXT NOT NULL
    );
  `);

  return db;
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};
