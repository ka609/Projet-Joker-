import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

function InvoicesPage({ invoices, copyToClipboard, deleteInvoice, handlePayInvoice, handleCheckPayment }) {
  return (
    <section id="past-invoices">
      <Row>
        <Col md={8} className="mx-auto">
          <h3>Factures Générées :</h3>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <Card key={invoice.id} className="mb-3">
                <Card.Body>
                  <Card.Title>Facture ID : {invoice.id}</Card.Title>
                  <Card.Text><strong>Montant : </strong>{invoice.amount} BTC</Card.Text>
                  <Card.Text><strong>Description : </strong>{invoice.description}</Card.Text>
                  <Card.Text><strong>Demande de Paiement : </strong>{invoice.paymentRequest}</Card.Text>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <Card.Text><strong>Créée le : </strong>{invoice.createdAt ? new Date(invoice.createdAt).toLocaleString() : 'Date non disponible'}</Card.Text>
                      <Card.Text><strong>Mise à jour le : </strong>{invoice.updatedAt ? new Date(invoice.updatedAt).toLocaleString() : 'Date non disponible'}</Card.Text>
                      <Card.Text><strong>Expire le : </strong>{invoice.expiresAt ? new Date(invoice.expiresAt).toLocaleString() : 'Date non disponible'}</Card.Text>
                    </div>

                    <div>
                      <img src={invoice.qrCode} alt="QR Code" style={{ width: '100px', height: '100px' }} />
                    </div>
                  </div>

                  <Button variant="info" onClick={() => copyToClipboard(invoice.paymentRequest)}>Copier</Button>
                  <Button variant="danger" className="ml-2" onClick={() => deleteInvoice(invoice.paymentRequest)}>Supprimer</Button>
                  <Button variant="success" className="ml-2" onClick={() => handlePayInvoice(invoice.paymentRequest)}>Payer</Button>
                  <Button variant="secondary" className="ml-2" onClick={() => handleCheckPayment(invoice.paymentRequest)}>Vérifier</Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Aucune facture passée pour le moment.</p>
          )}
        </Col>
      </Row>
    </section>
  );
}

export default InvoicesPage;
