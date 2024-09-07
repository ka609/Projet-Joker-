import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './InvoiceDisplay.css';  // Importation du fichier CSS

const InvoiceDisplay = ({ invoice }) => {
  const amount = invoice.amount || 'Montant non disponible';
  const paymentRequest = invoice.paymentRequest || 'Payment Request non disponible';
  const memo = invoice.memo || 'Description non disponible';
  const date = invoice.date || 'Date non disponible';

  return (
    <div className="invoice-display-container">
      <h3 className="invoice-title">Facture Générée :</h3>
      <p><strong>ID de la Facture :</strong> {invoice.id}</p>
      <p><strong>Montant :</strong> {amount}</p>
      <p><strong>Description :</strong> {memo}</p>
      
      <label htmlFor="paymentRequest" className="label-payment">Facture (Payment Request) :</label>
      <textarea
        id="paymentRequest"
        className="payment-request-textarea"
        value={paymentRequest}
        readOnly
      />
      
      <p><strong>Date :</strong> {date}</p>
      <p><strong>Payée :</strong> {invoice.paid ? 'Oui' : 'Non'}</p>

      <h4 className="qr-title">QR Code :</h4>
      {invoice.paymentRequest ? (
        <div className="qr-container">
          <QRCodeSVG value={invoice.paymentRequest} />
        </div>
      ) : (
        <p>QR Code non disponible</p>
      )}
    </div>
  );
};

export default InvoiceDisplay;
