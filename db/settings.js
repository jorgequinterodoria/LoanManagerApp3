import { getDatabase } from './index.js';

export const getSettings = async () => {
  const db = getDatabase();
  const settings = await db.getFirstAsync('SELECT * FROM settings LIMIT 1');

  if (!settings) {
    const defaultSettings = {
      interestRates: [5, 10, 15],
      paymentPeriods: [1, 2, 3, 4, 5],
    };

    await db.runAsync(
      'INSERT INTO settings (interestRates, paymentPeriods) VALUES (?, ?)',
      [
        JSON.stringify(defaultSettings.interestRates),
        JSON.stringify(defaultSettings.paymentPeriods),
      ]
    );

    return defaultSettings;
  }

  return {
    interestRates: JSON.parse(settings.interestRates),
    paymentPeriods: JSON.parse(settings.paymentPeriods),
  };
};

export const updateSettings = async (settings) => {
  const db = getDatabase();
  await db.runAsync(
    'UPDATE settings SET interestRates = ?, paymentPeriods = ? WHERE id = 1',
    [
      JSON.stringify(settings.interestRates),
      JSON.stringify(settings.paymentPeriods),
    ]
  );
};
