const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const Invoice = require('./models/Invoice');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode');

const app = express();
app.use(express.json());
app.use(cors());

sequelize.sync({ force: false }).then(() => {
    console.log("Base de données synchronisée");
});

const macaroon = fs.readFileSync(path.join(__dirname, './admin.macaroon')).toString('hex');

const lndApi = axios.create({
    baseURL: 'https://my-first-node.m.voltageapp.io:8080/v1',
    headers: {
        'Grpc-Metadata-macaroon': macaroon,
        'Content-Type': 'application/json'
    }
});

async function generateQRCode(text) {
    try {
        return await qrcode.toDataURL(text);
    } catch (error) {
        console.error('Erreur lors de la génération du code QR:', error);
        throw error;
    }
}

app.post('/generate-invoice', async (req, res) => {
    const { amount } = req.body;

    try {
        const response = await lndApi.post('/invoices', {
            value: amount.toString(),
            memo: "Facture générée",
            expiry: 3600
        });

        const paymentRequest = response.data.payment_request;
        const createdAt = response.data.creation_date;
        const updatedAt = response.data.settle_date || createdAt;

        const qrCode = await generateQRCode(paymentRequest);

        const invoice = {
            id: response.data.r_hash,
            amount,
            paymentRequest,
            createdAt: new Date(createdAt * 1000),
            updatedAt: new Date(updatedAt * 1000),
            qrCode
        };

        res.status(200).json(invoice);
    } catch (error) {
        console.error('Erreur lors de la génération de la facture:', error);
        res.status(500).json({ message: 'Erreur lors de la génération de la facture' });
    }
});

app.post('/pay-invoice', async (req, res) => {
    const { paymentRequest } = req.body;

    try {
        const response = await lndApi.post('/payinvoice', { payment_request: paymentRequest });
        res.json(response.data);
    } catch (error) {
        console.error('Erreur lors du paiement de la facture:', error);
        res.status(500).json({ message: 'Erreur lors du paiement de la facture', error: error.message });
    }
});

app.post('/verify-payment', async (req, res) => {
    const { paymentHash } = req.body;

    try {
        const response = await lndApi.get(`/invoice/${paymentHash}`);

        const isPaid = response.data.settled;

        const invoice = await Invoice.findOne({ where: { paymentRequest: paymentHash } });
        if (invoice) {
            invoice.paid = isPaid;
            await invoice.save();
        }

        res.json({ status: isPaid ? 'Paiement confirmé' : 'En attente' });
    } catch (error) {
        console.error('Erreur lors de la vérification du paiement:', error);
        res.status(500).send({ error: 'Erreur lors de la vérification du paiement' });
    }
});

app.get('/invoices', async (req, res) => {
    try {
        const invoices = await Invoice.findAll();
        res.json({ invoices });
    } catch (error) {
        console.error('Erreur lors de la récupération des factures:', error);
        res.status(500).send({ error: 'Erreur lors de la récupération des factures' });
    }
});

app.delete('/delete-invoice', async (req, res) => {
    const { paymentRequest } = req.body;

    try {
        await Invoice.destroy({ where: { paymentRequest } });
        res.status(200).json({ message: 'Facture supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la facture:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la facture' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));