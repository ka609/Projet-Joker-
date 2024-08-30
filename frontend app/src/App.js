import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Assurez-vous que le fichier CSS est bien configuré

// Importer les composants des sous-pages
import HomePage from './pages/HomePage';
import InvoicesPage from './pages/InvoicesPage';

function App() {
  const [amount, setAmount] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const fetchInvoices = useCallback(async () => {
    try {
      const response = await axios.get('/invoices'); // Assurez-vous que cette URL est correcte
      setInvoices(response.data.invoices);
    } catch (error) {
      console.error('Erreur lors du chargement des factures:', error);
      setConfirmationMessage('Erreur lors du chargement des factures');
    }
  }, []);

  useEffect(() => {
    fetchInvoices(); // Charger les factures au démarrage
  }, [fetchInvoices]);

  const handleGenerateInvoice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/generate-invoice', { amount });
      setConfirmationMessage('Facture générée avec succès !');

      // Ajouter la nouvelle facture à la liste
      setInvoices(prevInvoices => [...prevInvoices, response.data]);
      setAmount(''); // Réinitialiser le montant
    } catch (error) {
      console.error('Erreur lors de la génération de la facture:', error);
      setConfirmationMessage('Erreur lors de la génération de la facture');
    }
  };

  const handleCheckPayment = async (paymentRequest) => {
    if (!paymentRequest) {
      setConfirmationMessage('Aucune facture à vérifier.');
      return;
    }

    try {
      const response = await axios.post('/check-payment', { paymentRequest });
      setConfirmationMessage(`Détails du paiement : ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Erreur lors de la vérification du paiement:', error);
      setConfirmationMessage('Erreur lors de la vérification du paiement');
    }
  };

  const handlePayInvoice = async (paymentRequest) => {
    try {
      const response = await axios.post('/pay-invoice', { paymentRequest });
      setConfirmationMessage(`Paiement effectué : ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Erreur lors du paiement de la facture:', error);
      setConfirmationMessage('Erreur lors du paiement de la facture');
    }
  };

  const copyToClipboard = (paymentRequest) => {
    navigator.clipboard.writeText(paymentRequest).then(() => {
      alert('Facture copiée dans le presse-papiers');
    }).catch(err => {
      console.error('Erreur lors de la copie dans le presse-papiers:', err);
    });
  };

  const deleteInvoice = async (paymentRequest) => {
    try {
      await axios.delete('/delete-invoice', { data: { paymentRequest } });
      setInvoices(prevInvoices => prevInvoices.filter(inv => inv.paymentRequest !== paymentRequest));
      setConfirmationMessage('Facture supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la facture:', error);
      setConfirmationMessage('Erreur lors de la suppression de la facture');
    }
  };

  return (
    <Router>
      <Container fluid className="background-image">
      <header>
        <div className="header">
          <h1>Générateur de Factures Foudre</h1>
          </div>
        </header>
        <Row>
    <Col xs={3}>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/">Accueil</Nav.Link>
        <Nav.Link as={Link} to="/invoices">Factures</Nav.Link>
      </Nav>
    </Col>
    <Col xs={9}>

        {confirmationMessage && (
          <section id="confirmation-message" className="mb-4">
            <Row>
              <Col md={8} className="mx-auto">
                <Alert variant="info">
                  {confirmationMessage}
                </Alert>
              </Col>
            </Row>
          </section>
        )}

        <Routes>
          <Route path="/" element={
            <HomePage
              amount={amount}
              setAmount={setAmount}
              handleGenerateInvoice={handleGenerateInvoice}
            />
          } />
          <Route path="/invoices" element={
            <InvoicesPage
              invoices={invoices}
              copyToClipboard={copyToClipboard}
              deleteInvoice={deleteInvoice}
              handlePayInvoice={handlePayInvoice}
              handleCheckPayment={handleCheckPayment}
            />
          } />
        </Routes>
        </Col>
       </Row>
      </Container>
    </Router>
  );
}

export default App;
