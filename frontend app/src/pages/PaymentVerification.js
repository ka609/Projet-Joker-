// src/screens/PaymentVerification.js

import React, { useState } from 'react';
import axios from 'axios';

const PaymentVerification = () => {
    const [invoiceId, setInvoiceId] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVerifyPayment = async () => {
        if (!invoiceId) {
            setError('L\'ID de la facture est requis.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/verify-payment', { invoiceId });

            setStatus(response.data.status);
        } catch (err) {
            setError('Erreur lors de la vérification du paiement.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-verification">
            <h2>Vérification du Paiement</h2>
            <input
                type="text"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                placeholder="Entrez l'ID de la facture"
            />
            <button onClick={handleVerifyPayment} disabled={loading}>
                {loading ? 'Vérification...' : 'Vérifier'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {status && <p>Statut : {status}</p>}
        </div>
    );
};

export default PaymentVerification;
