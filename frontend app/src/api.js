import axios from 'axios';

export const fetchInvoices = async () => {
    try {
        const response = await axios.get('/invoices');
        return response.data.invoices;
    } catch (error) {
        console.error('Erreur lors du chargement des factures:', error);
        throw new Error('Erreur lors du chargement des factures');
    }
};

export const generateInvoice = async (amount) => {
    try {
        const response = await axios.post('/generate-invoice', { amount });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la génération de la facture:', error);
        throw new Error('Erreur lors de la génération de la facture');
    }
};

export const checkPayment = async (paymentRequest) => {
    try {
        const response = await axios.post('/check-payment', { paymentRequest });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la vérification du paiement:', error);
        throw new Error('Erreur lors de la vérification du paiement');
    }
};

export const payInvoice = async (paymentRequest) => {
    try {
        const response = await axios.post('/pay-invoice', { paymentRequest });
        return response.data;
    } catch (error) {
        console.error('Erreur lors du paiement de la facture:', error);
        throw new Error('Erreur lors du paiement de la facture');
    }
};

export const deleteInvoice = async (paymentRequest) => {
    try {
        await axios.delete('/delete-invoice', { data: { paymentRequest } });
    } catch (error) {
        console.error('Erreur lors de la suppression de la facture:', error);
        throw new Error('Erreur lors de la suppression de la facture');
    }
};
