import React, { useState } from 'react'; 
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
function HomePage({amount, setAmount, handleGenerateInvoice }) {
  const [description, setDescription] = useState('');

  return (
    <section id="generate-invoice" className="mb-4">
      <Container  >
        <Row className="top-bottom-element">
          <Col className="text-center">
            <Form onSubmit={handleGenerateInvoice}>
              {/* Montant */}
              <Form.Group controlId="formAmount" className="mb-3">
                <Form.Label>Montant (BTC)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.00000001" // BTC precision
                  placeholder="Entrez le montant en BTC"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }}
                />
              </Form.Group>

              {/* Description */}
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez une description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">Générer la facture</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HomePage;
