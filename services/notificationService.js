import * as Notifications from 'expo-notifications';

export const scheduleLoanNotification = async (loanId, date) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Préstamo Pendiente',
            body: `El préstamo ${loanId} está próximo a vencer`,
        },
        trigger: { date },
    });
};
