import axios from 'axios';

// Fonction pour récupérer toutes les factures
export const fetchInvoices = async () => {
    try {
        const response = await axios.get('/invoices');
        return response.data.invoices;  // Assurez-vous que `invoices` est bien la clé de réponse
    } catch (error) {
        console.error('Erreur lors du chargement des factures:', error);
        throw new Error('Erreur lors du chargement des factures');
    }
};

// Fonction pour générer une nouvelle facture
export const generateInvoice = async (amount, memo) => {  // Ajout du paramètre `memo`
    try {
        const response = await axios.post('/generate-invoice', { amount, memo });
        return response.data;  // Retourne les données de la réponse
    } catch (error) {
        console.error('Erreur lors de la génération de la facture:', error);
        throw new Error('Erreur lors de la génération de la facture');
    }
};

// Fonction pour vérifier le paiement
export const checkPayment = async (paymentHash) => {  // Changement de `paymentRequest` en `paymentHash` si nécessaire
    try {
        const response = await axios.post('/verify-payment', { paymentHash });
        return response.data;  // Retourne les données de la réponse
    } catch (error) {
        console.error('Erreur lors de la vérification du paiement:', error);
        throw new Error('Erreur lors de la vérification du paiement');
    }
};

// Fonction pour payer une facture
export const payInvoice = async (paymentRequest) => {
    try {
        const response = await axios.post('/pay-invoice', { paymentRequest });
        return response.data;  // Retourne les données de la réponse
    } catch (error) {
        console.error('Erreur lors du paiement de la facture:', error);
        throw new Error('Erreur lors du paiement de la facture');
    }
};

// Fonction pour supprimer une facture
export const deleteInvoice = async (paymentRequest) => {
    try {
        await axios.delete('/delete-invoice', { data: { paymentRequest } });  // `data` utilisé pour les requêtes DELETE
    } catch (error) {
        console.error('Erreur lors de la suppression de la facture:', error);
        throw new Error('Erreur lors de la suppression de la facture');
    }
};
// Fonction pour gérer l'authentification
export const auth = async (credentials) => {
    try {
        const response = await axios.post('/login', credentials);
        return response.data;  // Retourne les données de l'utilisateur authentifié
    } catch (error) {
        console.error('Erreur lors de l\'authentification:', error);
        throw new Error('Erreur lors de l\'authentification');
    }
};
