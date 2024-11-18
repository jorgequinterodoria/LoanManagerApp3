import React, { createContext, useReducer, useEffect } from 'react';
import * as dbService from '../services/dbService';
import { scheduleLoanNotification } from '../services/notificationService';

const LoanContext = createContext();

const loanReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CUSTOMERS':
            return {
                ...state,
                customers: action.payload,
            };
        case 'ADD_CUSTOMER':
            return {
                ...state,
                customers: [...state.customers, action.payload],
            };
        case 'UPDATE_CUSTOMER':
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer.id === action.payload.id ? action.payload : customer
                ),
            };
        case 'DELETE_CUSTOMER':
            return {
                ...state,
                customers: state.customers.filter(customer => customer.id !== action.payload),
            };
        case 'SET_LOANS':
            return {
                ...state,
                loans: action.payload,
            };
        case 'ADD_LOAN':
            return {
                ...state,
                loans: [...state.loans, action.payload],
            };
        case 'UPDATE_LOAN':
            return {
                ...state,
                loans: state.loans.map(loan =>
                    loan.id === action.payload.id ? action.payload : loan
                ),
            };
        case 'DELETE_LOAN':
            return {
                ...state,
                loans: state.loans.filter(loan => loan.id !== action.payload),
            };
        case 'PAY_LOAN':
            return {
                ...state,
                loans: state.loans.map(loan =>
                    loan.id === action.payload.loanId
                        ? { ...loan, payments: [...(loan.payments || []), action.payload.payment] }
                        : loan
                ),
            };
        case 'SET_SETTINGS':
            return {
                ...state,
                settings: action.payload,
            };
        default:
            return state;
    }
};

const LoanProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loanReducer, {
        loans: [],
        customers: [],
        settings: {
            interestRates: [],
            paymentPeriods: [],
        },
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [customers, loans, settings] = await Promise.all([
                    dbService.getCustomers(),
                    dbService.getLoans(),
                    dbService.getSettings()
                ]);

                dispatch({ type: 'SET_CUSTOMERS', payload: customers });
                dispatch({ type: 'SET_LOANS', payload: loans });
                dispatch({ type: 'SET_SETTINGS', payload: settings });
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData();
    }, []);

    const addCustomer = async (customer, callback) => {
        try {
            const insertId = await dbService.addCustomer(customer);
            const newCustomer = { ...customer, id: insertId };
            dispatch({ type: 'ADD_CUSTOMER', payload: newCustomer });
            if (callback) callback(newCustomer);
        } catch (error) {
            console.error('Error adding customer:', error);
            throw error;
        }
    };

    const updateCustomer = async (customer) => {
        try {
            await dbService.updateCustomer(customer);
            dispatch({ type: 'UPDATE_CUSTOMER', payload: customer });
        } catch (error) {
            console.error('Error updating customer:', error);
            throw error;
        }
    };

    const deleteCustomer = async (customerId) => {
        try {
            await dbService.deleteCustomer(customerId);
            dispatch({ type: 'DELETE_CUSTOMER', payload: customerId });
        } catch (error) {
            console.error('Error deleting customer:', error);
            throw error;
        }
    };

    const addLoan = async (loan, callback) => {
        try {
            const startDate = new Date().toISOString();
            const remainingInstallments = loan.type === 'interest' ? 1 : loan.amount / loan.frequency;
            const newLoan = {
                ...loan,
                startDate,
                remainingAmount: loan.amount,
                remainingInstallments
            };

            const insertId = await dbService.addLoan(newLoan);
            const loanWithId = { ...newLoan, id: insertId };
            dispatch({ type: 'ADD_LOAN', payload: loanWithId });

            if (callback) callback(loanWithId);

            // Schedule notification for next payment
            const nextPaymentDate = new Date();
            nextPaymentDate.setDate(nextPaymentDate.getDate() + loan.frequency);
            scheduleLoanNotification(loanWithId.id, nextPaymentDate);
        } catch (error) {
            console.error('Error adding loan:', error);
            throw error;
        }
    };

    const updateLoan = async (loan) => {
        try {
            await dbService.updateLoan(loan);
            dispatch({ type: 'UPDATE_LOAN', payload: loan });
        } catch (error) {
            console.error('Error updating loan:', error);
            throw error;
        }
    };

    const deleteLoan = async (loanId) => {
        try {
            await dbService.deleteLoan(loanId);
            dispatch({ type: 'DELETE_LOAN', payload: loanId });
        } catch (error) {
            console.error('Error deleting loan:', error);
            throw error;
        }
    };

    const payLoan = async (loanId, payment) => {
        try {
            const paymentWithDate = { ...payment, date: new Date().toISOString() };
            await dbService.makePayment(loanId, paymentWithDate);

            const loans = await dbService.getLoans();
            const updatedLoan = loans.find(loan => loan.id === loanId);

            dispatch({
                type: 'PAY_LOAN',
                payload: { loanId, payment: paymentWithDate }
            });
            dispatch({
                type: 'UPDATE_LOAN',
                payload: updatedLoan
            });

            // Schedule notification for next payment
            const nextPaymentDate = new Date();
            nextPaymentDate.setDate(nextPaymentDate.getDate() + updatedLoan.frequency);
            scheduleLoanNotification(updatedLoan.id, nextPaymentDate);
        } catch (error) {
            console.error('Error processing payment:', error);
            throw error;
        }
    };

    const fetchSettings = async (callback) => {
        try {
            const settings = await dbService.getSettings();
            dispatch({ type: 'SET_SETTINGS', payload: settings });
            if (callback) callback(settings);
        } catch (error) {
            console.error('Error fetching settings:', error);
            throw error;
        }
    };

    const updateSettings = async (settings) => {
        try {
            await dbService.updateSettings(settings);
            dispatch({ type: 'SET_SETTINGS', payload: settings });
        } catch (error) {
            console.error('Error updating settings:', error);
            throw error;
        }
    };

    return (
        <LoanContext.Provider
            value={{
                ...state,
                addCustomer,
                updateCustomer,
                deleteCustomer,
                addLoan,
                updateLoan,
                deleteLoan,
                payLoan,
                fetchSettings,
                updateSettings,
            }}
        >
            {children}
        </LoanContext.Provider>
    );
};

export { LoanContext, LoanProvider };
