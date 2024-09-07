import React, { useState } from 'react';
import InvoiceDisplay from '../components/InvoiceDisplay';
import { generateInvoice } from '../api';
import AlertMessage from '../components/AlertMessage';
import './InvoicePage.css';  // Importation du fichier CSS

const InvoicePage = () => {
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleGenerateInvoice = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await generateInvoice(amount, memo);
      setInvoice({
        id: data.id,
        amount: data.amount,
        paymentRequest: data.paymentRequest,
        date: data.date,
        paid: data.paid,
      });
      setShowAlert(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invoice-page">
      <h2 className="invoice-title">Générateur de Factures</h2>

      {/* Affichage de l'alerte de succès */}
      {showAlert && <AlertMessage message="Facture générée avec succès !" type="success" duration={3000} />}

      <div className="form-group">
        <label>Montant (satoshis):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label>Mémo:</label>
        <input
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={handleGenerateInvoice} disabled={loading} className="generate-btn">
        {loading ? 'Génération...' : 'Générer la Facture'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {invoice && <InvoiceDisplay invoice={invoice} />}
    </div>
  );
};

export default InvoicePage;
