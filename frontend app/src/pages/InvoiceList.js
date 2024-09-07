// src/screens/InvoiceList.js
import React, { useState, useEffect } from 'react';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        fetch('/invoices')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setInvoices(data);
                } else {
                    console.error('Les données reçues ne sont pas un tableau:', data);
                }
            })
            .catch(error => console.error('Erreur:', error));
    }, []);
    
    return (
        <div className="invoice-list">
            <h2>Liste des Factures</h2>
            <ul>
                {invoices.length > 0 ? (
                    invoices.map((invoice, index) => (
                        <li key={index}>
                            {invoice.id} - {invoice.status}
                            {/* Ajouter les options pour copier, supprimer ou vérifier */}
                        </li>
                    ))
                ) : (
                    <li>Aucune facture disponible</li>
                )}
            </ul>
        </div>
    );
};

export default InvoiceList;
