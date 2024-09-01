import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Row, Col, Alert, Nav, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Importer uniquement les composants et fonctions nécessaires
import InvoicesPage from './pages/InvoicesPage';
import { fetchInvoices, generateInvoice, checkPayment, payInvoice, deleteInvoice } from './api';

function App() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [invoices, setInvoices] = useState([]);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const loadInvoices = useCallback(async () => {
        try {
            const invoicesData = await fetchInvoices();
            setInvoices(invoicesData);
        } catch (error) {
            setConfirmationMessage(error.message);
        }
    }, []);

    useEffect(() => {
        loadInvoices();
    }, [loadInvoices]);

    const handleGenerateInvoice = async (e) => {
        e.preventDefault();
        try {
            const newInvoice = await generateInvoice(amount);
            setConfirmationMessage('Facture générée avec succès !');
            setInvoices(prevInvoices => [...prevInvoices, newInvoice]);
            setAmount('');
            setDescription('');
        } catch (error) {
            setConfirmationMessage(error.message);
        }
    };

    const handleCheckPayment = async (paymentRequest) => {
        if (!paymentRequest) {
            setConfirmationMessage('Aucune facture à vérifier.');
            return;
        }

        try {
            const paymentDetails = await checkPayment(paymentRequest);
            setConfirmationMessage(`Détails du paiement : ${JSON.stringify(paymentDetails)}`);
        } catch (error) {
            setConfirmationMessage(error.message);
        }
    };

    const handlePayInvoice = async (paymentRequest) => {
        try {
            const paymentResult = await payInvoice(paymentRequest);
            setConfirmationMessage(`Paiement effectué : ${JSON.stringify(paymentResult)}`);
        } catch (error) {
            setConfirmationMessage(error.message);
        }
    };

    const handleDeleteInvoice = async (paymentRequest) => {
        try {
            await deleteInvoice(paymentRequest);
            setInvoices(prevInvoices => prevInvoices.filter(inv => inv.paymentRequest !== paymentRequest));
            setConfirmationMessage('Facture supprimée avec succès');
        } catch (error) {
            setConfirmationMessage(error.message);
        }
    };

    const copyToClipboard = (paymentRequest) => {
        navigator.clipboard.writeText(paymentRequest)
            .then(() => alert('Facture copiée dans le presse-papiers'))
            .catch(err => console.error('Erreur lors de la copie dans le presse-papiers:', err));
    };

    return (
        <Router>
            <div className="container">
                <header>
                    <div className="header">
                        <h1>Paiement Rapide en Bitcoin</h1>
                    </div>
                </header>
                <div className="main-content">
                    <aside className="sidebar">
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                            <Nav.Link as={Link} to="/invoices">Factures</Nav.Link>
                        </Nav>
                    </aside>
                    <section className="content">
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
                                <div>
                                    <Form onSubmit={handleGenerateInvoice}>
                                        <Form.Group controlId="amount">
                                            <Form.Label>Montant (en satoshis)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="Entrez le montant"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Entrez la description"
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Générer la Facture
                                        </Button>
                                    </Form>
                                </div>
                            } />
                            <Route path="/invoices" element={
                                <InvoicesPage
                                    invoices={invoices}
                                    copyToClipboard={copyToClipboard}
                                    deleteInvoice={handleDeleteInvoice}
                                    handlePayInvoice={handlePayInvoice}
                                    handleCheckPayment={handleCheckPayment}
                                />
                            } />
                        </Routes>
                    </section>
                </div>
                <footer>
                    <p>&copy; 2024 Paiement Rapide en Bitcoin</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
